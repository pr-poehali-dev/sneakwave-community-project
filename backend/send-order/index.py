import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет уведомление о новом заказе на почту магазина."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    address = body.get("address", "").strip()
    product_name = body.get("product_name", "").strip()
    product_price = body.get("product_price", "")
    size = body.get("size", "")
    brand = body.get("brand", "")

    if not all([name, phone, address, product_name]):
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Заполните все обязательные поля"}, ensure_ascii=False),
        }

    to_email = os.environ["ORDERS_EMAIL"]
    smtp_password = os.environ["SMTP_PASSWORD"]

    subject = f"🛒 Новый заказ SneakWave — {product_name}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A0A0A; padding: 24px 32px;">
        <h1 style="color: #FAFAFA; font-size: 28px; margin: 0; letter-spacing: 2px;">SNEAKWAVE</h1>
        <p style="color: #FF3B1F; margin: 4px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Новый заказ</p>
      </div>
      <div style="padding: 32px; border: 1px solid #eee; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #F2F2F0;">
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; width: 40%;">Товар</td>
            <td style="padding: 16px 20px; font-weight: 700; font-size: 16px; color: #0A0A0A;">{product_name}</td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Бренд</td>
            <td style="padding: 16px 20px; color: #0A0A0A;">{brand}</td>
          </tr>
          <tr style="background: #F2F2F0;">
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Размер</td>
            <td style="padding: 16px 20px; font-weight: 600; color: #0A0A0A;">{size}</td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Цена</td>
            <td style="padding: 16px 20px; font-weight: 700; font-size: 18px; color: #FF3B1F;">{product_price}</td>
          </tr>
          <tr style="background: #F2F2F0;">
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Имя</td>
            <td style="padding: 16px 20px; color: #0A0A0A;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Телефон</td>
            <td style="padding: 16px 20px; color: #0A0A0A;"><a href="tel:{phone}" style="color: #0A0A0A;">{phone}</a></td>
          </tr>
          <tr style="background: #F2F2F0;">
            <td style="padding: 16px 20px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Адрес</td>
            <td style="padding: 16px 20px; color: #0A0A0A;">{address}</td>
          </tr>
        </table>
      </div>
      <div style="background: #0A0A0A; padding: 16px 32px; text-align: center;">
        <p style="color: #FAFAFA; opacity: 0.4; font-size: 12px; margin: 0;">© 2025 SneakWave — твой стиль в движении</p>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = to_email
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(to_email, smtp_password)
        server.sendmail(to_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }