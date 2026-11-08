
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  template: `
    <div class="forgot-page">

      <!-- HEADER -->
      <header class="header">
        <a routerLink="/login" class="logo">
          <span>⚡</span> SPORTZONE
        </a>
        <div class="user-icon">👤</div>
      </header>

      <!-- MAIN -->
      <main class="main-container">

        <div class="forgot-card">

          <!-- LEFT BANNER -->
          <section class="left-panel">

            <div class="shield-label">
              <span>●</span> SPORTZONE SHIELD 2.0
            </div>

            <div class="banner-image">
              <img
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900"
                alt="Vận động viên thể thao"
              />
              <div class="image-caption">
                Bảo vệ tài khoản vận động viên đỉnh cao
              </div>
            </div>

            <div class="feature-box">
              <div class="feature-icon">◉</div>
              <div>
                <h4>Mã hóa đa tầng 256-Bit</h4>
                <p>
                  Chứng thực OTP thời gian thực với độ trễ dưới 2 giây.
                </p>
              </div>
            </div>

            <div class="feature-box">
              <div class="feature-icon">♢</div>
              <div>
                <h4>Bảo toàn đặc quyền hội viên</h4>
                <p>
                  Duy trì điểm thưởng Pro Drops và lịch sử đơn hàng an toàn.
                </p>
              </div>
            </div>

            <div class="left-footer">
              <span>♢ Xác thực mã hóa PCI-DSS</span>
              <span>v4.8 - Secure</span>
            </div>

          </section>

          <!-- RIGHT FORM -->
          <section class="right-panel">

            <!-- STEPS -->
            <div class="steps">
              <div class="step" [class.active]="step === 1">
                ✉ 1. Nhận mã OTP
              </div>

              <span class="step-arrow">›</span>

              <div class="step" [class.active]="step === 2">
                ≡ 2. Tạo mật khẩu mới
              </div>

              <span class="step-count">◷ Bước {{step}}/2</span>
            </div>

            <div class="progress-bar">
              <div [style.width]="step === 1 ? '50%' : '100%'"></div>
            </div>

            <div class="lock-icon">♙</div>

            <!-- STEP 1 -->
            <div *ngIf="step === 1">

              <h2>Quên mật khẩu?</h2>

              <p class="description">
                Nhập địa chỉ Email hoặc Số điện thoại đã liên kết tài khoản
                SportZone để nhận mã xác thực khôi phục tài khoản thể thao của bạn.
              </p>

              <form [formGroup]="requestForm" (ngSubmit)="sendOtp()">

                <label>Email hoặc Số điện thoại đăng ký</label>

                <input
                  type="text"
                  formControlName="identifier"
                  placeholder="✉  athlete@sportzone.vn"
                />

                <small class="error"
                  *ngIf="requestForm.get('identifier')?.touched &&
                  requestForm.get('identifier')?.invalid">
                  Vui lòng nhập Email hoặc số điện thoại.
                </small>

                <p class="hint">
                  Chúng tôi sẽ gửi mã gồm 6 chữ số có hiệu lực trong 5 phút.
                </p>

                <div class="method-list">

                  <label class="method-option">
                    <input
                      type="radio"
                      name="method"
                      [(ngModel)]="method"
                      [ngModelOptions]="{standalone: true}"
                      value="email"
                    />
                    <span>
                      Gửi qua Email
                      <small>Hộp thư chính</small>
                    </span>
                  </label>

                  <label class="method-option">
                    <input
                      type="radio"
                      name="method"
                      [(ngModel)]="method"
                      [ngModelOptions]="{standalone: true}"
                      value="sms"
                    />
                    <span>
                      Gửi qua Tin nhắn SMS
                      <small>Số di động</small>
                    </span>
                  </label>

                </div>

                <button type="submit" class="btn-primary">
                  GỬI MÃ XÁC MINH ➤
                </button>

              </form>

            </div>

            <!-- STEP 2 -->
            <div *ngIf="step === 2">

              <h2>Tạo mật khẩu mới</h2>

              <p class="description">
                Nhập mã OTP đã nhận và tạo mật khẩu mới cho tài khoản SPORTZONE.
              </p>

              <form [formGroup]="resetForm" (ngSubmit)="resetPassword()">

                <label>Mã xác minh OTP</label>

                <input
                  type="text"
                  formControlName="otp"
                  maxlength="6"
                  placeholder="Nhập mã OTP gồm 6 chữ số"
                />

                <small class="error"
                  *ngIf="resetForm.get('otp')?.touched &&
                  resetForm.get('otp')?.invalid">
                  Vui lòng nhập mã OTP gồm 6 chữ số.
                </small>

                <label>Mật khẩu mới</label>

                <input
                  type="password"
                  formControlName="password"
                  placeholder="Nhập mật khẩu mới"
                />

                <label>Xác nhận mật khẩu</label>

                <input
                  type="password"
                  formControlName="confirmPassword"
                  placeholder="Nhập lại mật khẩu mới"
                />

                <small class="error"
                  *ngIf="resetForm.hasError('mismatch')">
                  Mật khẩu xác nhận không khớp.
                </small>

                <button type="submit" class="btn-primary">
                  XÁC NHẬN ĐỔI MẬT KHẨU ➤
                </button>

                <button
                  type="button"
                  class="btn-back"
                  (click)="step = 1"
                >
                  ← Quay lại bước nhận OTP
                </button>

              </form>

            </div>

            <div class="message" *ngIf="message">
              {{message}}
            </div>

            <div class="form-footer">
              <a routerLink="/login">← Quay lại Đăng nhập</a>
              <span>◉ Trợ giúp kỹ thuật</span>
            </div>

          </section>

        </div>



      </main>

      <!-- FOOTER -->
      <footer class="footer">

        <div class="footer-left">
          <strong>⚡ SPORTZONE PERFORMANCE LABS INC.</strong>
          <span>© 2026 All rights reserved.</span>
        </div>

        <div class="footer-right">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản dịch vụ</a>
          <a href="#">Hỗ trợ khách hàng</a>
        </div>

      </footer>

    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      font-family: Arial, Helvetica, sans-serif;
      color: #26344d;
    }

    .forgot-page {
      min-height: 100vh;
      background: #f5f5f7;
      padding: 0 20px;
    }

    /* HEADER */

    .header {
      height: 53px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 27px;
      border-bottom: 1px solid #edf0fa;
    }

    .logo {
      font-size: 19px;
      font-weight: 900;
      color: #18243c;
      text-decoration: none;
    }

    .logo span {
      color: #1559bd;
    }

    .user-icon {
      width: 29px;
      height: 29px;
      border-radius: 50%;
      border: 1px solid #cbd9f5;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }

    /* MAIN */

    .main-container {
      min-height: 645px;
      padding: 45px 20px 30px;
      background: linear-gradient(
        120deg,
        #e6eafa,
        #faf8ff 55%,
        #e2e9ff
      );
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .forgot-card {
      width: 100%;
      max-width: 900px;
      min-height: 480px;
      display: grid;
      grid-template-columns: 40% 60%;
      background: #fff;
      border-radius: 13px;
      overflow: hidden;
      box-shadow: 0 12px 24px rgba(28, 43, 75, .15);
    }

    /* LEFT PANEL */

    .left-panel {
      background: linear-gradient(
        145deg,
        #e6eafa,
        #cbd7fb
      );
      padding: 25px;
      display: flex;
      flex-direction: column;
    }

    .shield-label {
      background: #fff;
      color: #1559bd;
      padding: 7px 12px;
      border-radius: 20px;
      font-size: 11px;
      width: fit-content;
      margin-bottom: 25px;
      font-weight: 600;
    }

    .shield-label span {
      color: #1559bd;
    }

    .banner-image {
      position: relative;
      width: 100%;
      height: 145px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 18px;
      box-shadow: 0 4px 8px #17243c20;
    }

    .banner-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 11px;
      color: white;
      background: rgba(15, 30, 57, .8);
      font-size: 11px;
    }

    .feature-box {
      display: flex;
      gap: 10px;
      background: rgba(255,255,255,.8);
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .feature-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      background: #1559bd;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-size: 12px;
    }

    .feature-box h4 {
      margin: 0 0 5px;
      font-size: 11px;
    }

    .feature-box p {
      color: #788398;
      font-size: 10px;
      line-height: 1.5;
      margin: 0;
    }

    .left-footer {
      margin-top: auto;
      padding-top: 25px;
      display: flex;
      justify-content: space-between;
      color: #536b9b;
      font-size: 10px;
    }

    /* RIGHT PANEL */

    .right-panel {
      padding: 30px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .steps {
      display: flex;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
    }

    .step {
      padding: 8px;
      background: #f0f2fa;
      border-radius: 6px;
      font-size: 10px;
      color: #778196;
    }

    .step.active {
      background: #1559bd;
      color: white;
    }

    .step-arrow {
      color: #a5adbd;
    }

    .step-count {
      font-size: 10px;
      color: #81899a;
      margin-left: auto;
    }

    .progress-bar {
      height: 4px;
      width: 100%;
      background: #e9edfb;
      border-radius: 5px;
      margin: 17px 0 22px;
      overflow: hidden;
    }

    .progress-bar div {
      height: 100%;
      background: #1559bd;
      transition: width .3s;
    }

    .lock-icon {
      width: 38px;
      height: 38px;
      background: #e8edff;
      color: #1559bd;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
      font-size: 21px;
    }

    h2 {
      font-size: 19px;
      margin: 0 0 9px;
      color: #202d45;
    }

    .description {
      color: #788194;
      font-size: 11px;
      line-height: 1.6;
      margin: 0 0 18px;
    }

    form > label {
      display: block;
      font-size: 11px;
      margin: 13px 0 8px;
      color: #354158;
    }

    form input:not([type="radio"]) {
      width: 100%;
      height: 39px;
      border: 1px solid #e3e6f2;
      border-radius: 7px;
      background: #f1f2ff;
      padding: 0 12px;
      font-size: 11px;
      outline: none;
      color: #26344d;
    }

    form input:focus {
      border-color: #1559bd;
      box-shadow: 0 0 0 2px #1559bd15;
    }

    .hint {
      color: #929aab;
      font-size: 10px;
      margin: 8px 0 15px;
    }

    .method-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 15px 0;
    }

    .method-option {
      background: #f1f2ff;
      border-radius: 7px;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      cursor: pointer;
      margin: 0;
    }

    .method-option input {
      accent-color: #1559bd;
    }

    .method-option small {
      display: block;
      color: #8992a5;
      margin-top: 3px;
    }

    .btn-primary {
      width: 100%;
      height: 42px;
      border: none;
      border-radius: 7px;
      background: #1559bd;
      color: white;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 3px 6px #1559bd30;
      margin-top: 5px;
    }

    .btn-primary:hover {
      background: #10489d;
    }

    .btn-back {
      display: block;
      border: none;
      background: none;
      color: #1559bd;
      font-size: 11px;
      cursor: pointer;
      margin-top: 13px;
    }

    .error {
      display: block;
      color: #dc3545;
      font-size: 10px;
      margin-top: 5px;
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #edf0f5;
      padding-top: 17px;
      margin-top: 22px;
      font-size: 10px;
    }

    .form-footer a {
      color: #1559bd;
      text-decoration: none;
      font-weight: 600;
    }

    .form-footer span {
      color: #929aab;
    }

    .message {
      color: #1559bd;
      font-size: 11px;
      margin-top: 10px;
    }

    /* FOOTER */

    .footer {
      min-height: 55px;
      background: white;
      padding: 17px 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 9px;
      color: #7d8799;
    }

    .footer-left,
    .footer-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .footer-left strong {
      color: #26344d;
    }

    .footer-right a {
      color: #59657a;
      text-decoration: none;
    }

    @media(max-width: 750px) {
      .forgot-page {
        padding: 0;
      }

      .main-container {
        padding: 25px 12px;
      }

      .forgot-card {
        grid-template-columns: 1fr;
      }

      .left-panel {
        min-height: 330px;
      }

      .right-panel {
        padding: 25px 20px;
      }

      .footer {
        justify-content: center;
      }
    }

    @media(max-width: 420px) {
      .steps {
        gap: 3px;
      }

      .step {
        font-size: 9px;
        padding: 7px 5px;
      }

      .method-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ForgotPasswordComponent {

  step = 1;
  method = 'email';
  message = '';

  private fb = new FormBuilder();

  requestForm: FormGroup = this.fb.group({
    identifier: ['', Validators.required]
  });

  resetForm: FormGroup = this.fb.group({
    otp: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: (form) => {
      const password = form.get('password')?.value;
      const confirm = form.get('confirmPassword')?.value;

      if (!password || !confirm) return null;

      return password === confirm ? null : { mismatch: true };
    }
  });

  sendOtp() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.message = 'Giao diện demo: Chưa kết nối API gửi mã OTP.';
    this.step = 2;
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.message =
      'Chưa kết nối Backend. Vui lòng tích hợp API để xác thực OTP và đổi mật khẩu.';
  }
}
