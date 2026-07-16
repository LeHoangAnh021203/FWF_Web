/* eslint-disable */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

// Token cache file path (only works in local/dev environment)
const TOKEN_CACHE_FILE = path.join(process.cwd(), ".zalo-token-cache.json");

interface TokenCache {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
}

// Check if we're in a serverless/production environment
const isProduction = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const isServerless = !process.env.FILE_SYSTEM_WRITABLE;

// Function to read token from cache
async function readTokenCache(): Promise<TokenCache | null> {
  if (isProduction || isServerless) {
    return null;
  }
  
  try {
    const data = await fs.readFile(TOKEN_CACHE_FILE, "utf-8");
    const cache: TokenCache = JSON.parse(data);
    return cache;
  } catch (error) {
    return null;
  }
}

// Function to save token to cache
async function saveTokenCache(cache: TokenCache): Promise<boolean> {
  if (isProduction || isServerless) {
    return false;
  }
  
  try {
    await fs.writeFile(TOKEN_CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
    return true;
  } catch (error) {
    return false;
  }
}

// Function to send email notification when token is refreshed
async function sendTokenRefreshEmail(
  tokenData: { access_token: string; refresh_token?: string; expires_at: number },
  emailTransporter: nodemailer.Transporter | null,
  emailFrom: string | undefined,
  emailTo: string | undefined
): Promise<void> {
  const notifyEmail = process.env.ZALO_TOKEN_NOTIFY_EMAIL || emailTo;
  
  if (!notifyEmail) {
    console.log('⚠️ No email configured for token refresh notification');
    return;
  }
  
  if (!emailTransporter) {
    console.log('⚠️ Email transporter not configured. Cannot send token refresh notification.');
    return;
  }
  
  try {
    const expiresInHours = ((tokenData.expires_at - Date.now()) / 3600000).toFixed(1);
    const tokenSubject = "🔄 Zalo OA Token đã được làm mới tự động";
    const tokenHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🔄 Zalo OA Access Token đã được làm mới</h2>
        <p>Hệ thống đã tự động refresh token Zalo OA của bạn.</p>
        ${isProduction || isServerless ? `
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⚠️ Cần cập nhật thủ công trong Production!</strong></p>
        </div>
        ` : `
        <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 12px; margin: 20px 0;">
          <p style="margin: 0;"><strong>✅ Token đã được tự động lưu vào cache (Local environment)</strong></p>
        </div>
        `}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <h3 style="color: #1f2937;">Token mới:</h3>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; margin: 10px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Access Token:</strong></p>
          <code style="background: #ffffff; padding: 8px; display: block; word-break: break-all; font-size: 12px; border: 1px solid #e5e7eb; border-radius: 4px;">${tokenData.access_token}</code>
        </div>
        ${tokenData.refresh_token ? `
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; margin: 10px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Refresh Token (mới):</strong></p>
          <code style="background: #ffffff; padding: 8px; display: block; word-break: break-all; font-size: 12px; border: 1px solid #e5e7eb; border-radius: 4px;">${tokenData.refresh_token}</code>
        </div>
        ` : ''}
        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⏰ Hết hạn sau:</strong> ${expiresInHours} giờ</p>
          <p style="margin: 8px 0 0 0;"><strong>📅 Hết hạn vào:</strong> ${new Date(tokenData.expires_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
        </div>
        ${isProduction || isServerless ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <h3 style="color: #1f2937;">📝 Cách cập nhật trong Production:</h3>
        <ol style="line-height: 1.8;">
          <li><strong>Vercel:</strong> Project Settings > Environment Variables > Edit <code>ZALO_OA_ACCESS_TOKEN</code></li>
          <li><strong>Local:</strong> Cập nhật file <code>.env</code></li>
          <li><strong>Khác:</strong> Cập nhật environment variables trên hosting platform của bạn</li>
        </ol>
        <div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⚠️ Lưu ý quan trọng:</strong> Token cũ sẽ không hoạt động sau ~25 giờ. Cần cập nhật sớm để tránh gián đoạn dịch vụ!</p>
        </div>
        ` : ''}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">Email này được gửi tự động khi token Zalo OA được refresh. Token sẽ tự động refresh lại sau ~25 giờ.</p>
        <p style="color: #10b981; font-size: 12px; margin-top: 10px;"><strong>🧪 TEST MODE:</strong> Đây là email test từ API endpoint /api/zalo/test-refresh</p>
      </div>
    `;
    
    const textContent = `Zalo OA Token Refreshed

Access Token: ${tokenData.access_token}
${tokenData.refresh_token ? `Refresh Token: ${tokenData.refresh_token}\n` : ''}Expires in: ${expiresInHours} hours
Expires at: ${new Date(tokenData.expires_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}

${isProduction || isServerless ? '⚠️ Cần cập nhật thủ công trong Production environment variables.\n' : '✅ Token đã được tự động lưu vào cache (Local environment).'}

🧪 TEST MODE: Đây là email test từ API endpoint /api/zalo/test-refresh`;
    
    await emailTransporter.sendMail({
      from: emailFrom || process.env.EMAIL_USER || "noreply@example.com",
      to: notifyEmail,
      subject: tokenSubject,
      html: tokenHtml,
      text: textContent
    });
    
    console.log(`📧 Email notification sent successfully to ${notifyEmail} about token refresh`);
  } catch (emailError) {
    console.error('❌ Failed to send token refresh email:', emailError);
    throw emailError;
  }
}

export async function GET(request: Request) {
  try {
    // Get environment variables
    const zaloRefreshToken = process.env.ZALO_OA_REFRESH_TOKEN;
    const host = process.env.EMAIL_HOST;
    const user = process.env.EMAIL_USER;
    // Support both EMAIL_PASS and EMAIL_PASSWORD
    const pass = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
    const from = process.env.EMAIL_FROM || user;
    const businessTo = process.env.BUSINESS_EMAIL_TO || user;

    // Check if refresh token is configured
    if (!zaloRefreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "ZALO_OA_REFRESH_TOKEN is not configured in environment variables"
        },
        { status: 400 }
      );
    }

    // Check if email is configured
    if (!host || !user || !pass) {
      const missing = [];
      if (!host) missing.push("EMAIL_HOST");
      if (!user) missing.push("EMAIL_USER");
      if (!pass) missing.push("EMAIL_PASS or EMAIL_PASSWORD");
      
      return NextResponse.json(
        {
          success: false,
          error: `Email is not configured. Missing: ${missing.join(", ")}`,
          details: {
            EMAIL_HOST: host ? "✓ configured" : "✗ missing",
            EMAIL_USER: user ? "✓ configured" : "✗ missing",
            EMAIL_PASS: process.env.EMAIL_PASS ? "✓ configured" : "✗ missing",
            EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "✓ configured" : "✗ missing"
          }
        },
        { status: 400 }
      );
    }

    console.log('🧪 TEST MODE: Starting token refresh test...');
    console.log('🔄 Refreshing Zalo token...');

    // Refresh token
    const response = await fetch('https://oauth.zalo.me/v4/oa/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: zaloRefreshToken,
        grant_type: 'refresh_token'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          success: false,
          error: `Failed to refresh token: HTTP ${response.status}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.access_token) {
      return NextResponse.json(
        {
          success: false,
          error: "No access_token in response",
          response: data
        },
        { status: 500 }
      );
    }

    const expiresIn = parseInt(data.expires_in || '90000', 10);
    const expiresAt = Date.now() + (expiresIn * 1000);
    const expiresInHours = (expiresIn / 3600).toFixed(1);

    console.log(`✅ Token refreshed successfully! Expires in ${expiresInHours} hours`);

    // Prepare token data
    const tokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token || zaloRefreshToken,
      expires_at: expiresAt
    };

    // Save to cache if local
    const saved = await saveTokenCache({
      access_token: data.access_token,
      refresh_token: data.refresh_token || zaloRefreshToken,
      expires_at: expiresAt
    });

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT || 587) === 465,
      auth: { user, pass },
    });

    // Send email notification
    let emailSent = false;
    let emailError: string | null = null;
    
    try {
      await sendTokenRefreshEmail(tokenData, transporter, from, businessTo);
      emailSent = true;
    } catch (error) {
      emailError = error instanceof Error ? error.message : String(error);
      console.error('❌ Email sending failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Token refresh test completed",
      tokenInfo: {
        access_token: data.access_token.substring(0, 20) + "...", // Only show first 20 chars for security
        expires_in: expiresIn,
        expires_in_hours: expiresInHours,
        expires_at: new Date(expiresAt).toISOString(),
        saved_to_cache: saved
      },
      emailNotification: {
        sent: emailSent,
        error: emailError,
        recipient: process.env.ZALO_TOKEN_NOTIFY_EMAIL || businessTo
      },
      note: "This is a test endpoint. Token has been refreshed and email notification sent."
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}
