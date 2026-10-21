import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "邮箱和留言内容不能为空" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // If API Key is not configured yet (e.g., local preview or awaiting key)
    if (!apiKey) {
      console.log("【收到留言 (待配置 RESEND_API_KEY)】:", {
        name,
        email,
        message,
        time: new Date().toISOString(),
      });
      return NextResponse.json({
        success: true,
        mock: true,
        message:
          "留言已成功被后端接收！只需在 .env.local 中配置 RESEND_API_KEY，即可实时直达你的 Gmail 邮箱。",
      });
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: "JohnnyBoyStudio <onboarding@resend.dev>",
      to: ["johnny.boy.1km@gmail.com"],
      replyTo: email,
      subject: `[JohnnyBoyStudio 新留言] 来自 ${name || email}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #27272a; border-radius: 16px; background: #0c0c10; color: #f4f4f5;">
          <div style="background: linear-gradient(135deg, #FF5A1F 0%, #ff7a45 100%); color: #ffffff; padding: 14px 20px; border-radius: 12px; font-weight: bold; font-size: 16px; display: flex; align-items: center; justify-content: space-between;">
            <span>JohnnyBoyStudio 收到新留言 </span>
          </div>

          <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
            <p style="font-size: 14px; color: #a1a1aa; margin: 6px 0;"><strong>称呼 / 发件人：</strong> <span style="color: #ffffff;">${name || "未填写"}</span></p>
            <p style="font-size: 14px; color: #a1a1aa; margin: 6px 0;"><strong>对方邮箱：</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></p>
            <p style="font-size: 14px; color: #a1a1aa; margin: 6px 0;"><strong>接收时间：</strong> <span style="color: #ffffff;">${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })} (UTC+8)</span></p>
          </div>

          <div style="margin-top: 20px; padding: 18px; background: #14161B; border-radius: 12px; border: 1px solid #27272a;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin: 0 0 10px 0;"><strong>留言正文</strong></p>
            <p style="font-size: 15px; color: #F6F4EF; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
            <p style="font-size: 12px; color: #71717a; margin: 0;">
              💡 提示：在邮件客户端中直接点击 <strong>“回复”</strong>，即可直接回信给 <a href="mailto:${email}" style="color: #FF5A1F;">${email}</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { error: error.message || "邮件服务投递失败，请稍后重试" },
      { status: 500 }
    );
  }
}
