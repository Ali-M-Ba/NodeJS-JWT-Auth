export const VERIFY_ACCOUNT_TEMPLATE = `
  <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Verify Account</title>
  <style>
    @media only screen and (max-width:600px){
      .container{width:100% !important}
      .otp-box{font-size:26px !important;padding:18px !important}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="center" style="padding:28px 12px;">

      <table class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#fff;border:6px solid #111;box-shadow:14px 14px 0 rgba(0,0,0,0.08);">

        <tr>
          <td style="padding:18px;background:#fffb00;border-bottom:6px solid #111;">
            <table width="100%"><tr>
              <td style="font-weight:800;font-size:20px;color:#111;">{{company_name}}</td>
              <td align="right" style="font-size:12px;color:#111;">Secure · Fast · Bold</td>
            </tr></table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:4px dashed #222;">
              <tr>
                <td style="padding:18px;background:#e6f7ff;border:8px solid #111;">

                  <h1 style="margin:0 0 8px;font-size:22px;color:#111;">Verify your account</h1>
                  <p style="margin:0 0 16px;color:#111;line-height:1.4;">Hi {{userName}},<br>Please confirm your email <strong>{{email}}</strong> to activate your account.</p>

                  <table style="margin:14px 0 18px;">
                    <tr><td align="center">
                      <a href="{{link}}" style="padding:12px 22px;border:4px solid #111;background:#00d1ff;color:#111;font-weight:700;border-radius:6px;text-decoration:none;box-shadow:8px 8px 0 rgba(0,0,0,0.06);">Confirm Email</a>
                    </td></tr>
                  </table>

                  <p style="margin:0 0 12px;color:#111;">Or enter this one-time code (OTP):</p>
                  <div class="otp-box" style="padding:22px 28px;font-size:28px;font-weight:800;letter-spacing:4px;background:#fff;border:6px solid #111;border-radius:8px;display:inline-block;box-shadow:12px 12px 0 rgba(0,0,0,0.06);">{{otp}}</div>

                  <p style="margin:18px 0 0;color:#111;font-size:13px;line-height:1.4;">This code expires in 5 minutes. If this wasn't you, ignore this email or contact <a href="mailto:{{support_email}}" style="font-weight:700;color:#111;">{{support_email}}</a>.</p>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:14px;background:#f7f7f7;border-top:6px solid #111;font-size:12px;color:#111;">
            <table width="100%"><tr>
              <td>© {{year}} {{company_name}}.</td>
              <td align="right">Need help? <a href="mailto:{{support_email}}" style="color:#111;font-weight:700;">Contact support</a></td>
            </tr></table>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>

  `;

export const RESET_PASSWORD_TEMPLATE = `
  <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    @media only screen and (max-width:600px){
      .container{width:100% !important}
      .otp-box{font-size:26px !important;padding:18px !important}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td align="center" style="padding:28px 12px;">

      <table class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#fff;border:6px solid #111;box-shadow:14px 14px 0 rgba(0,0,0,0.08);">

        <tr>
          <td style="padding:18px;background:#fffb00;border-bottom:6px solid #111;">
            <table width="100%"><tr>
              <td style="font-weight:800;font-size:20px;color:#111;">{{company_name}}</td>
              <td align="right" style="font-size:12px;color:#111;">Secure · Fast · Bold</td>
            </tr></table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:4px solid #111;">
              <tr>
                <td style="padding:18px;background:#fffbe6;border:8px solid #111;">

                  <h2 style="margin:0 0 8px;font-size:20px;color:#111;">Reset your password</h2>
                  <p style="margin:0 0 12px;color:#111;line-height:1.4;">We received a request to reset the password for <strong>{{email}}</strong>. You can reset it using the button below or use the OTP code.</p>

                  <table style="margin:12px 0 16px;">
                    <tr><td align="center">
                      <a href="{{link}}" style="padding:12px 22px;border:4px solid #111;background:#ff6b6b;color:#111;font-weight:800;border-radius:6px;text-decoration:none;box-shadow:10px 10px 0 rgba(0,0,0,0.06);">Reset Password</a>
                    </td></tr>
                  </table>

                  <p style="margin:0 0 12px;color:#111;">Or use this OTP:</p>
                  <div class="otp-box" style="padding:22px 28px;font-size:28px;font-weight:800;letter-spacing:4px;background:#fff;border:6px solid #111;border-radius:8px;display:inline-block;box-shadow:12px 12px 0 rgba(0,0,0,0.06);">{{otp}}</div>

                  <p style="margin:18px 0 0;color:#111;font-size:13px;line-height:1.4;">If you didn't request this, ignore the email or contact <a href="mailto:{{support_email}}" style="font-weight:700;color:#111;">{{support_email}}</a>.</p>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:14px;background:#f7f7f7;border-top:6px solid #111;font-size:12px;color:#111;">
            <table width="100%"><tr>
              <td>© {{year}} {{company_name}}.</td>
              <td align="right">Need help? <a href="mailto:{{support_email}}" style="color:#111;font-weight:700;">Contact support</a></td>
            </tr></table>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>

  `;
