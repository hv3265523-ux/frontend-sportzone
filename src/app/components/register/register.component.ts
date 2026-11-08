
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

// Kiểm tra mật khẩu xác nhận
function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('matKhau')?.value;
  const confirmPassword = control.get('xacNhanMatKhau')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  template: `
    <div class="register-page">

      <!-- HEADER -->
      <header class="top-header">
        <a routerLink="/" class="logo">
          <span>ϟ</span> SPORTZONE
        </a>

        <button class="header-icon" type="button" (click)="goHome()">
          ×
        </button>
      </header>

      <!-- KHU VỰC ĐĂNG KÝ -->
      <main class="register-background">

        <div class="register-modal">

          <!-- BANNER BÊN TRÁI -->
          <section class="register-banner">

            <div class="banner-content">

              <div>
                <div class="brand-tags">
                  <span class="brand-label">ϟ SPORTZONE • PRO LAB</span>
                  <span class="performance-label">PERFORMANCE</span>
                </div>

                <div class="gift-label">
                  ♔ QUÀ TẶNG THÀNH VIÊN MỚI
                </div>

                <h1>
                  BỨT PHÁ GIỚI HẠN,
                  <span>CHINH PHỤC ĐỈNH CAO</span>
                </h1>

                <p class="banner-description">
                  Trở thành hội viên SportZone để mở khóa quyền
                  mua sắm bổ sung tại giải pháp và nhận hàng ngàn
                  đặc quyền thú vị.
                </p>
              </div>

              <!-- QUYỀN LỢI -->
              <div class="benefit-list">

                <div class="benefit-item">
                  <div class="benefit-icon">♜</div>
                  <div>
                    <h4>VOUCHER 100.000Đ CHÀO MỪNG</h4>
                    <p>
                      Áp dụng ngay cho đơn hàng đầu tiên
                      khi đăng ký thành viên.
                    </p>
                  </div>
                </div>

                <div class="benefit-item">
                  <div class="benefit-icon">♜</div>
                  <div>
                    <h4>TÍCH LŨY ĐIỂM SPORTPOINTS</h4>
                    <p>
                      Nhận hoàn tiền dưới dạng điểm cho
                      mọi lượt mua, thăng hạng VIP.
                    </p>
                  </div>
                </div>

                <div class="benefit-item">
                  <div class="benefit-icon">♧</div>
                  <div>
                    <h4>ƯU TIÊN DROP ĐỘC QUYỀN</h4>
                    <p>
                      Truy cập sớm các phiên bản giày
                      Race Day và áo thi đấu bản Player.
                    </p>
                  </div>
                </div>

              </div>

              <div class="member-count">
                <div class="member-avatars">
                  <span>VN</span>
                  <span>RUN</span>
                  <span>PRO</span>
                </div>

                <p>
                  <strong>128.400+</strong>
                  vận động viên tin dùng
                </p>
              </div>

            </div>
          </section>

          <!-- FORM BÊN PHẢI -->
          <section class="register-form-section">

            <button
              type="button"
              class="close-button"
              (click)="goHome()">
              ×
            </button>

            <div class="form-heading">

              <div class="heading-label">
                <span></span> TÀI KHOẢN THÀNH VIÊN
              </div>

              <h2>Tạo tài khoản SportZone</h2>

              <p>
                Đăng ký ngay để nhận
                <strong>Voucher 100K</strong>
                và tích điểm thành viên!
              </p>

            </div>

            <form
              [formGroup]="registerForm"
              (ngSubmit)="onSubmit()">

              <!-- HỌ TÊN -->
              <div class="form-group">

                <label>HỌ VÀ TÊN <b>*</b></label>

                <div class="input-wrapper">
                  <span class="input-icon">♙</span>

                  <input
                    type="text"
                    formControlName="hoTen"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    autocomplete="name"
                  />
                </div>

                <small
                  class="error-text"
                  *ngIf="
                    registerForm.get('hoTen')?.touched &&
                    registerForm.get('hoTen')?.invalid
                  ">
                  Vui lòng nhập họ và tên.
                </small>

              </div>

              <!-- EMAIL VÀ SỐ ĐIỆN THOẠI -->
              <div class="form-grid">

                <div class="form-group">

                  <label>EMAIL <b>*</b></label>

                  <div class="input-wrapper">
                    <span class="input-icon">@</span>

                    <input
                      type="email"
                      formControlName="email"
                      placeholder="athlete@sportzone.vn"
                      autocomplete="email"
                    />
                  </div>

                  <small
                    class="error-text"
                    *ngIf="
                      registerForm.get('email')?.touched &&
                      registerForm.get('email')?.invalid
                    ">
                    Email không hợp lệ.
                  </small>

                </div>

                <div class="form-group">

                  <label>SỐ ĐIỆN THOẠI NHẬN HÀNG <b>*</b></label>

                  <div class="input-wrapper">
                    <span class="input-icon">▯</span>

                    <input
                      type="tel"
                      formControlName="soDienThoai"
                      placeholder="0912 345 678"
                      autocomplete="tel"
                    />
                  </div>

                  <small
                    class="error-text"
                    *ngIf="
                      registerForm.get('soDienThoai')?.touched &&
                      registerForm.get('soDienThoai')?.invalid
                    ">
                    Vui lòng nhập số điện thoại hợp lệ.
                  </small>

                </div>

              </div>

              <!-- MẬT KHẨU VÀ XÁC NHẬN -->
              <div class="form-grid">

                <div class="form-group">

                  <label>MẬT KHẨU <b>*</b></label>

                  <div class="input-wrapper">
                    <span class="input-icon">♙</span>

                    <input
                      [type]="showPassword ? 'text' : 'password'"
                      formControlName="matKhau"
                      placeholder="Nhập mật khẩu"
                      autocomplete="new-password"
                    />

                    <button
                      type="button"
                      class="eye-button"
                      (click)="togglePassword()">
                      {{ showPassword ? 'Ẩn' : '◉' }}
                    </button>
                  </div>

                  <small
                    class="error-text"
                    *ngIf="
                      registerForm.get('matKhau')?.touched &&
                      registerForm.get('matKhau')?.invalid
                    ">
                    Mật khẩu tối thiểu 6 ký tự.
                  </small>

                  <small class="password-hint">
                    ◉ Tối thiểu 6 ký tự, gồm chữ và số.
                  </small>

                </div>

                <div class="form-group">

                  <label>XÁC NHẬN MẬT KHẨU <b>*</b></label>

                  <div class="input-wrapper">
                    <span class="input-icon">♢</span>

                    <input
                      [type]="showConfirmPassword ? 'text' : 'password'"
                      formControlName="xacNhanMatKhau"
                      placeholder="Nhập lại mật khẩu"
                      autocomplete="new-password"
                    />

                    <button
                      type="button"
                      class="eye-button"
                      (click)="toggleConfirmPassword()">
                      {{ showConfirmPassword ? 'Ẩn' : '◉' }}
                    </button>
                  </div>

                  <small
                    class="error-text"
                    *ngIf="
                      registerForm.get('xacNhanMatKhau')?.touched &&
                      registerForm.hasError('passwordMismatch')
                    ">
                    Mật khẩu xác nhận không khớp.
                  </small>

                  <small
                    class="error-text"
                    *ngIf="
                      registerForm.get('xacNhanMatKhau')?.touched &&
                      registerForm.get('xacNhanMatKhau')?.hasError('required')
                    ">
                    Vui lòng xác nhận mật khẩu.
                  </small>

                </div>

              </div>

              <!-- ĐIỀU KHOẢN -->
              <div class="terms-row">

                <label>
                  <input
                    type="checkbox"
                    formControlName="dongYDieuKhoan"
                  />

                  <span>
                    Tôi đồng ý với
                    <a routerLink="/terms">Điều khoản dịch vụ</a>
                    và
                    <a routerLink="/privacy">Chính sách bảo mật</a>
                    của SportZone.
                  </span>
                </label>

              </div>

              <small
                class="error-text terms-error"
                *ngIf="
                  registerForm.get('dongYDieuKhoan')?.touched &&
                  registerForm.get('dongYDieuKhoan')?.invalid
                ">
                Bạn cần đồng ý với điều khoản để đăng ký.
              </small>

              <!-- THÔNG BÁO LỖI -->
              <div class="server-error" *ngIf="errorMessage">
                {{ errorMessage }}
              </div>

              <!-- NÚT ĐĂNG KÝ -->
              <button
                type="submit"
                class="btn-register"
                [disabled]="registerForm.invalid || isLoading">

                {{ isLoading ? 'ĐANG TẠO TÀI KHOẢN...' : 'ĐĂNG KÝ TÀI KHOẢN →' }}

              </button>



              <!-- ĐĂNG NHẬP -->
              <div class="form-bottom">

                <span>
                  Đã có tài khoản?
                  <a routerLink="/login">Đăng nhập ngay</a>
                </span>

                <span class="secure-text">
                  ◈ Bảo mật chuẩn SSL 256-bit
                </span>

              </div>

            </form>

          </section>

        </div>

      </main>

      <!-- FOOTER -->
      <footer class="register-footer">

        <div class="footer-left">
          <h4>ϟ SPORTZONE PERFORMANCE LABS INC.</h4>
          <span>© 2026 Bản quyền được bảo lưu.</span>
        </div>

        <div class="footer-right">
          <a routerLink="/privacy">Chính sách bảo mật</a>
          <a routerLink="/terms">Điều khoản dịch vụ</a>
          <a>Hỗ trợ khách hàng</a>
        </div>

      </footer>

    </div>
  `,

  styles: [`
    :host {
      display: block;
      font-family: Arial, Helvetica, sans-serif;
      color: #18243c;
    }

    * {
      box-sizing: border-box;
    }

    .register-page {
      min-height: 100vh;
      background: #f4f5fa;
    }

    /* HEADER */

    .top-header {
      height: 65px;
      padding: 0 3%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-size: 20px;
      font-weight: 900;
      color: #18233b;
      text-decoration: none;
    }

    .logo span {
      color: #1559bd;
      font-size: 28px;
    }

    .header-icon {
      width: 26px;
      height: 26px;
      border: 1px solid #d9defe;
      border-radius: 50%;
      color: #1559bd;
      background: #eef1ff;
      cursor: pointer;
    }

    /* BACKGROUND */

    .register-background {
      min-height: 570px;
      padding: 40px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(circle at 5% 10%, #607ba7 0%, transparent 35%),
        linear-gradient(120deg, #414c68, #62677a);
    }

    /* MODAL */

    .register-modal {
      width: 100%;
      max-width: 1160px;
      min-height: 455px;
      display: grid;
      grid-template-columns: 42% 58%;
      background: white;
      border-radius: 17px;
      overflow: hidden;
      box-shadow: 0 15px 45px rgba(0, 0, 0, .22);
    }

    /* LEFT BANNER */

    .register-banner {
      position: relative;
      color: white;
      min-height: 455px;
      background:
        linear-gradient(
          180deg,
          rgba(0, 18, 55, .72),
          rgba(0, 20, 58, .97)
        ),
        url('/images/register-banner.jpg')
        center / cover no-repeat;
      border-right: 1px solid #d7dce8;
    }

    .banner-content {
      height: 100%;
      min-height: 455px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand-tags {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .brand-label,
    .performance-label {
      font-size: 10px;
      font-weight: bold;
      padding: 7px 11px;
      border-radius: 20px;
    }

    .brand-label {
      background: rgba(255,255,255,.16);
    }

    .performance-label {
      background: #174d9f;
    }

    .gift-label {
      width: fit-content;
      background: #ff9400;
      color: white;
      padding: 7px 11px;
      border-radius: 15px;
      font-size: 10px;
      font-weight: bold;
      margin-top: 20px;
    }

    .register-banner h1 {
      font-size: 27px;
      line-height: 1.25;
      font-weight: 900;
      margin: 18px 0 8px;
      color: white;
    }

    .register-banner h1 span {
      display: block;
      color: #69c8ff;
    }

    .banner-description {
      font-size: 12px;
      line-height: 1.7;
      color: #c9d5eb;
      max-width: 380px;
    }

    /* BENEFITS */

    .benefit-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 15px;
    }

    .benefit-item {
      display: flex;
      gap: 12px;
      align-items: center;
      background: rgba(255,255,255,.09);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 13px;
      padding: 12px;
    }

    .benefit-icon {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      border-radius: 9px;
      background: rgba(255, 177, 0, .18);
      color: #ffc43d;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }

    .benefit-item:nth-child(2) .benefit-icon {
      color: #5bd0ff;
      background: rgba(32, 169, 232, .2);
    }

    .benefit-item:nth-child(3) .benefit-icon {
      color: #51e0bd;
      background: rgba(30, 196, 154, .17);
    }

    .benefit-item h4 {
      margin: 0 0 5px;
      font-size: 10px;
      color: white;
    }

    .benefit-item p {
      margin: 0;
      font-size: 9px;
      line-height: 1.5;
      color: #bdcce5;
    }

    .member-count {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      margin-top: 15px;
      border-radius: 12px;
      background: rgba(255,255,255,.09);
    }

    .member-avatars {
      display: flex;
      align-items: center;
    }

    .member-avatars span {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #2465cb;
      border: 1px solid white;
      margin-right: -6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 7px;
      font-weight: bold;
    }

    .member-avatars span:nth-child(2) {
      background: #1a9cbd;
    }

    .member-avatars span:nth-child(3) {
      background: #7354d6;
    }

    .member-count p {
      font-size: 9px;
      color: #d7e2f6;
      margin: 0;
    }

    .member-count strong {
      color: #ffc43d;
    }

    /* RIGHT FORM */

    .register-form-section {
      position: relative;
      background: white;
      padding: 35px 40px 25px;
    }

    .close-button {
      position: absolute;
      top: 16px;
      right: 17px;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: #f0f2ff;
      color: #64718b;
      font-size: 20px;
      cursor: pointer;
    }

    .close-button:hover {
      background: #e2e8ff;
    }

    .heading-label {
      color: #1559bd;
      font-size: 10px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .heading-label span {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1559bd;
      margin-right: 5px;
    }

    .form-heading h2 {
      color: #17243e;
      font-size: 25px;
      font-weight: 900;
      margin: 0 0 7px;
    }

    .form-heading p {
      font-size: 11px;
      color: #7c8493;
      margin: 0 0 20px;
    }

    .form-heading p strong {
      color: #1559bd;
    }

    /* INPUT */

    .form-group {
      margin-bottom: 14px;
      min-width: 0;
    }

    .form-group label {
      display: block;
      color: #303b50;
      font-size: 10px;
      font-weight: bold;
      margin-bottom: 7px;
    }

    .form-group label b {
      color: #e44949;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      height: 42px;
      border: 1px solid #dfe3eb;
      border-radius: 8px;
      padding: 0 11px;
      transition: .2s;
      min-width: 0;
    }

    .input-wrapper:focus-within {
      border-color: #1559bd;
      box-shadow: 0 0 0 3px rgba(21, 89, 189, .08);
    }

    .input-icon {
      width: 20px;
      flex-shrink: 0;
      color: #6d788d;
      font-size: 15px;
    }

    .input-wrapper input {
      width: 100%;
      min-width: 0;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: 11px;
      color: #25334c;
    }

    .input-wrapper input::placeholder {
      color: #afb6c3;
    }

    .eye-button {
      border: none;
      background: transparent;
      color: #667086;
      font-size: 11px;
      cursor: pointer;
      padding: 3px;
    }

    .error-text {
      display: block;
      font-size: 9px;
      color: #dc3545;
      margin-top: 5px;
    }

    .password-hint {
      display: block;
      font-size: 9px;
      color: #8892a5;
      margin-top: 5px;
    }

    /* TERMS */

    .terms-row {
      margin: 7px 0 12px;
    }

    .terms-row label {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      color: #59657a;
      font-size: 10px;
      line-height: 1.5;
      cursor: pointer;
    }

    .terms-row input {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      margin: 1px 0 0;
      accent-color: #1559bd;
    }

    .terms-row a {
      color: #1559bd;
      text-decoration: none;
    }

    .terms-row a:hover {
      text-decoration: underline;
    }

    .terms-error {
      margin: -7px 0 10px;
    }

    .server-error {
      color: #dc3545;
      background: #fff0f0;
      padding: 9px;
      border-radius: 6px;
      font-size: 11px;
      margin-bottom: 10px;
    }

    /* REGISTER BUTTON */

    .btn-register {
      width: 100%;
      height: 44px;
      background: #1559bd;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(21, 89, 189, .2);
      transition: .2s;
    }

    .btn-register:hover:not(:disabled) {
      background: #10489d;
      transform: translateY(-1px);
    }

    .btn-register:disabled {
      background: #91add7;
      cursor: not-allowed;
    }

    /* DIVIDER */

    .divider {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0 15px;
    }

    .divider span {
      height: 1px;
      flex: 1;
      background: #e9edf4;
    }

    .divider b {
      font-size: 9px;
      color: #8991a0;
      white-space: nowrap;
    }



    /* BOTTOM */

    .form-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      border-top: 1px solid #edf0f5;
      margin-top: 20px;
      padding-top: 15px;
      font-size: 10px;
      color: #737e90;
    }

    .form-bottom a {
      color: #1559bd;
      text-decoration: none;
      font-weight: bold;
    }

    .secure-text {
      color: #7b9b92;
      font-size: 9px;
    }

    /* FOOTER */

    .register-footer {
      min-height: 53px;
      padding: 15px 3%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      background: white;
      color: #747e90;
      font-size: 9px;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .footer-left h4 {
      color: #1c2b45;
      font-size: 9px;
      margin: 0;
    }

    .footer-right {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .footer-right a {
      color: #59657a;
      text-decoration: none;
      cursor: pointer;
    }

    .footer-right a:hover {
      color: #1559bd;
    }

    /* RESPONSIVE */

    @media (max-width: 900px) {
      .register-modal {
        grid-template-columns: 38% 62%;
      }

      .register-form-section {
        padding: 35px 25px 25px;
      }

      .banner-content {
        padding: 22px;
      }

      .register-banner h1 {
        font-size: 22px;
      }
    }

    @media (max-width: 650px) {
      .register-background {
        padding: 20px 12px;
      }

      .register-modal {
        grid-template-columns: 1fr;
        max-width: 480px;
      }

      .register-banner {
        min-height: auto;
      }

      .banner-content {
        min-height: 340px;
      }

      .register-form-section {
        padding: 30px 22px;
      }

      .register-footer {
        flex-direction: column;
        align-items: flex-start;
      }

      .footer-right {
        gap: 12px;
      }
    }

    @media (max-width: 420px) {
      .form-grid {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-heading h2 {
        font-size: 21px;
      }

      .form-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})

export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  registerForm: FormGroup = this.fb.group({

    hoTen: ['', [Validators.required]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    soDienThoai: ['', [
      Validators.required,
      Validators.pattern(/^(0|\+84)[0-9]{9}$/)
    ]],

    matKhau: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],

    xacNhanMatKhau: ['', [
      Validators.required
    ]],

    dongYDieuKhoan: [false, [
      Validators.requiredTrue
    ]]

  }, {
    validators: passwordMatchValidator
  });

  // Hiện / ẩn mật khẩu
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Hiện / ẩn mật khẩu xác nhận
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Quay về trang chủ
  goHome() {
    this.router.navigate(['/']);
  }

  // Xử lý đăng ký
  onSubmit() {

    if (this.registerForm.invalid || this.isLoading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Chỉ gửi các trường backend cần thiết
    // Không gửi mật khẩu xác nhận và điều khoản
    const registerData = {
      hoTen: this.registerForm.value.hoTen,
      email: this.registerForm.value.email,
      matKhau: this.registerForm.value.matKhau,
      soDienThoai: this.registerForm.value.soDienThoai
    };

    this.authService.register(registerData).subscribe({

      next: () => {
        this.isLoading = false;

        alert('Đăng ký tài khoản thành công!');

        this.router.navigate(['/login']);
      },

      error: (err: any) => {

        this.isLoading = false;

        console.error('Lỗi đăng ký:', err);

        this.errorMessage =
          err?.error?.message ||
          'Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.';
      }

    });

  }

}
