
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <div class="login-page">

      <!-- Phần nền phía sau -->
      <div class="background-page">
        <header class="fake-header">
          <div class="fake-logo">⚡ SPORTZONE</div>
          <nav>
            <span>Trang chủ</span>
            <span>Sản phẩm</span>
            <span>Nam</span>
            <span>Nữ</span>
            <span>Tin tức</span>
          </nav>
          <div class="header-icons">♡　🛒　●</div>
        </header>

        <div class="fake-content">
          <h2>SPORTZONE PERFORMANCE</h2>
          <p>Chinh phục giới hạn của bạn</p>
        </div>
      </div>

      <!-- Lớp phủ -->
      <div class="login-overlay">

        <!-- Khung đăng nhập -->
        <div class="login-modal">

          <!-- Cột trái: Banner thể thao -->
          <div class="login-banner">

            <div class="banner-content">

              <div class="brand-label">
                ⚡ SPORTZONE • PRO LAB
              </div>

              <div class="banner-subtitle">
                PERFORMANCE & GEAR
              </div>

              <div class="banner-main">
                <span class="banner-tag">SẴN SÀNG BỨT PHÁ</span>

                <h1>
                  BỨT PHÁ GIỚI HẠN,
                  CHINH PHỤC ĐỈNH CAO
                </h1>

                <p>
                  Trải nghiệm mua sắm thiết bị thể thao chính hãng
                  hàng đầu Việt Nam cùng hàng ngàn đặc quyền
                  thành viên độc bản.
                </p>
              </div>

              <div class="benefit-box">
                <h4>QUYỀN LỢI THÀNH VIÊN SPORTZONE:</h4>

                <div>
                  <span>◉</span>
                  Tích lũy điểm thưởng SportZone Rewards
                </div>

                <div>
                  <span>◉</span>
                  Giảm thêm 10% ngay cho đơn đầu tiên
                </div>

                <div>
                  <span>◉</span>
                  Đổi trả & đổi size miễn phí trong 30 ngày
                </div>
              </div>

            </div>
          </div>

          <!-- Cột phải: Form đăng nhập -->
          <div class="login-form-section">

            <button
              class="close-button"
              type="button"
              aria-label="Đóng"
              (click)="goHome()">
              ×
            </button>

            <div class="form-heading">
              <div class="heading-label">
                <span></span> TÀI KHOẢN THÀNH VIÊN
              </div>

              <h2>Đăng nhập tài khoản SportZone</h2>

              <p>
                Chào mừng bạn quay trở lại đường đua cùng
                cộng đồng vận động viên!
              </p>
            </div>

            <form
              [formGroup]="loginForm"
              (ngSubmit)="onSubmit()">

              <!-- Email / số điện thoại -->
              <div class="form-group">

                <label>Email hoặc Số điện thoại <b>*</b></label>

                <div class="input-wrapper">
                  <span class="input-icon">@</span>

                  <input
                    type="text"
                    formControlName="email"
                    placeholder="Ví dụ: athlete@sportzone.vn hoặc 0912345678"
                    autocomplete="username"
                  />
                </div>

                <small
                  class="error-text"
                  *ngIf="
                    loginForm.get('email')?.touched &&
                    loginForm.get('email')?.invalid
                  ">
                  Vui lòng nhập email hoặc số điện thoại.
                </small>

              </div>

              <!-- Mật khẩu -->
              <div class="form-group">

                <div class="password-label">
                  <label>Mật khẩu <b>*</b></label>

                  <a routerLink="/forgot-password">
                    Quên mật khẩu?
                  </a>
                </div>

                <div class="input-wrapper">
                  <span class="input-icon">♙</span>

                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    formControlName="matKhau"
                    placeholder="Nhập mật khẩu của bạn"
                    autocomplete="current-password"
                  />

                  <button
                    type="button"
                    class="eye-button"
                    (click)="togglePassword()">
                    {{ showPassword ? 'Ẩn' : 'Hiện' }}
                  </button>
                </div>

                <small
                  class="error-text"
                  *ngIf="
                    loginForm.get('matKhau')?.touched &&
                    loginForm.get('matKhau')?.invalid
                  ">
                  Mật khẩu không được để trống.
                </small>

              </div>

              <!-- Ghi nhớ đăng nhập -->
              <div class="remember-row">

                <label class="remember-label">
                  <input
                    type="checkbox"
                    formControlName="remember"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>

                <span class="security-label">
                  ◈ BẢO MẬT CAO
                </span>

              </div>

              <!-- Thông báo lỗi -->
              <div class="server-error" *ngIf="errorMessage">
                {{ errorMessage }}
              </div>

              <!-- Nút đăng nhập -->
              <button
                type="submit"
                class="btn-login"
                [disabled]="loginForm.invalid || isLoading">

                {{ isLoading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP →' }}

              </button>



              <!-- Đăng ký -->
              <div class="register-text">
                Chưa có tài khoản SportZone?
                <a routerLink="/register">Đăng ký ngay</a>
              </div>

              <!-- Bảo mật -->
              <div class="security-footer">
                <span>♙</span>
                Dữ liệu cá nhân được bảo mật chuẩn SSL 256-bit
                bởi SportZone Performance Labs.
              </div>

            </form>
          </div>

        </div>
      </div>

      
<!-- Footer -->
<footer class="login-footer">

  <!-- Thương hiệu -->
  <div class="footer-brand">
    <h3>⚡ SPORTZONE</h3>
    <p>
      Mang đến trang phục thể thao cao cấp,
      thiết kế hiện đại và hiệu suất vượt trội,
      đồng hành cùng bạn trên mọi hành trình.
    </p>
  </div>

  <!-- Hiệu suất -->
  <div class="footer-column">
    <h4>Hiệu suất</h4>
    <a>Trang phục chạy bộ</a>
    <a>Bộ sưu tập leo núi</a>
    <a>Sản phẩm phục hồi thể lực</a>
  </div>

  <!-- Chăm sóc khách hàng -->
  <div class="footer-column">
    <h4>Hỗ trợ vận động viên</h4>
    <a>Thông tin tài khoản</a>
    <a>Theo dõi đơn hàng</a>
    <a>Chính sách bảo hành</a>
  </div>

  <!-- Cộng đồng -->
  <div class="footer-column pro-circle">
    <h4>Cộng đồng SportZone</h4>
    <p>
      Đăng ký nhận thông tin về sản phẩm mới,
      chương trình ưu đãi và sự kiện thể thao
      dành riêng cho thành viên.
    </p>

    <div class="newsletter">
      <input
        type="email"
        placeholder="Nhập email của bạn"
      />
      <button type="button">Đăng ký</button>
    </div>
  </div>

  <!-- Bản quyền -->
  <div class="footer-bottom">
    <span>
      © 2026 SPORTZONE. BẢN QUYỀN ĐƯỢC BẢO LƯU.
    </span>

    <div>
      <a>CHÍNH SÁCH BẢO MẬT</a>
      <a>ĐIỀU KHOẢN SỬ DỤNG</a>
      <a>AN TOÀN</a>
    </div>
  </div>

</footer>


    </div>
  `,

  styles: [`
    :host {
      display: block;
      font-family: Arial, Helvetica, sans-serif;
      color: #17243e;
    }

    * {
      box-sizing: border-box;
    }

    .login-page {
      min-height: 100vh;
      background: #f1f2f8;
      position: relative;
      overflow: hidden;
    }

    /* BACKGROUND */

    .background-page {
      height: 560px;
      padding: 25px 5%;
      background: linear-gradient(120deg, #dce5f7, #eef1fa);
      filter: blur(2px);
      opacity: .75;
    }

    .fake-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #263d65;
      font-weight: bold;
    }

    .fake-logo {
      font-size: 20px;
      color: #1454bd;
    }

    .fake-header nav {
      display: flex;
      gap: 30px;
      font-size: 13px;
    }

    .header-icons {
      font-size: 19px;
    }

    .fake-content {
      margin-top: 130px;
      text-align: center;
      color: #526482;
    }

    /* OVERLAY */

    .login-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 560px;
      background: rgba(13, 23, 49, .60);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 15px;
      z-index: 2;
    }

    /* MODAL */

    .login-modal {
      width: 100%;
      max-width: 950px;
      min-height: 450px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #fff;
      border-radius: 11px;
      overflow: hidden;
      box-shadow: 0 20px 55px rgba(0, 0, 0, .25);
    }

    /* LEFT BANNER */

    .login-banner {
      min-height: 450px;
      position: relative;
      display: flex;
      align-items: stretch;
      background:
        linear-gradient(
          0deg,
          rgba(0, 22, 65, .96) 0%,
          rgba(0, 30, 80, .55) 48%,
          rgba(0, 0, 0, .20) 100%
        ),
        url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000')
        center / cover no-repeat;
      color: white;
    }

    .banner-content {
      padding: 30px 28px 25px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand-label {
      display: inline-block;
      width: fit-content;
      background: rgba(25, 48, 88, .85);
      border-radius: 20px;
      padding: 8px 13px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: .5px;
    }

    .banner-subtitle {
      font-size: 10px;
      letter-spacing: 1px;
      font-weight: bold;
      margin-top: -65px;
      color: #cbdcff;
    }

    .banner-main {
      margin-top: 15px;
    }

    .banner-tag {
      background: #e87817;
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      padding: 5px 9px;
    }

    .banner-main h1 {
      font-size: 27px;
      line-height: 1.2;
      margin: 12px 0;
      font-weight: 900;
      color: white;
    }

    .banner-main p {
      font-size: 12px;
      line-height: 1.6;
      color: #d6e0f4;
      max-width: 300px;
    }

    .benefit-box {
      background: rgba(25, 57, 110, .8);
      border: 1px solid rgba(255,255,255,.12);
      padding: 14px;
      border-radius: 10px
      font-size: 10px;
    }

    .benefit-box h4 {
      margin: 0 0 10px;
      font-size: 10px;
    }

    .benefit-box div {
      margin: 7px 0;
      color: #e3edff;
    }

    .benefit-box span {
      color: #39a9ff;
      margin-right: 6px;
    }

    /* RIGHT FORM */

    .login-form-section {
      padding: 30px 36px 22px;
      position: relative;
      background: #fff;
    }

    .close-button {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: #edf0ff;
      color: #263653;
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
    }

    .close-button:hover {
      background: #dce4ff;
    }

    .heading-label {
      color: #1358bf;
      font-size: 10px;
      font-weight: bold;
      margin-bottom: 7px;
    }

    .heading-label span {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #1559c2;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 4px;
    }

    .form-heading h2 {
      font-size: 22px;
      font-weight: 800;
      margin: 0 0 7px;
      color: #18233b;
      line-height: 1.3;
    }

    .form-heading p {
      color: #788091;
      font-size: 11px;
      line-height: 1.5;
      margin: 0 0 20px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #273349;
      margin-bottom: 8px;
    }

    .form-group label b {
      color: #e34848;
    }

    .input-wrapper {
      height: 43px;
      border: 1px solid #e5e8ef;
      border-radius: 7px;
      display: flex;
      align-items: center;
      padding: 0 11px;
      transition: .2s;
    }

    .input-wrapper:focus-within {
      border-color: #165bc2;
      box-shadow: 0 0 0 3px rgba(22, 91, 194, .08);
    }

    .input-icon {
      font-size: 15px;
      font-weight: bold;
      color: #7c8494;
      width: 20px;
    }

    .input-wrapper input {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #273349;
      background: transparent;
      min-width: 0;
    }

    .input-wrapper input::placeholder {
      color: #b4bac5;
    }

    .password-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .password-label a {
      font-size: 10px;
      color: #1559bd;
      text-decoration: none;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .eye-button {
      border: none;
      background: transparent;
      color: #5c6578;
      cursor: pointer;
      font-size: 10px;
      white-space: nowrap;
    }

    .error-text {
      display: block;
      color: #e04444;
      font-size: 10px;
      margin-top: 5px;
    }

    /* REMEMBER */

    .remember-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2px 0 17px;
    }

    .remember-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #535e72;
      cursor: pointer;
    }

    .remember-label input {
      accent-color: #1559bd;
      width: 13px;
      height: 13px;
    }

    .security-label {
      font-size: 9px;
      color: #64728a;
      font-weight: bold;
    }

    .server-error {
      color: #d93030;
      font-size: 11px;
      background: #fff0f0;
      padding: 9px;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    /* BUTTON */

    .btn-login {
      width: 100%;
      height: 43px;
      background: #1557b8;
      border: none;
      border-radius: 7px;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 3px 7px rgba(21, 87, 184, .2);
      transition: .2s;
    }

    .btn-login:hover:not(:disabled) {
      background: #0d469c;
      transform: translateY(-1px);
    }

    .btn-login:disabled {
      background: #8ba9d5;
      cursor: not-allowed;
    }

    /* REGISTER */

    .register-text {
      text-align: center;
      margin-top: 25px;
      font-size: 11px;
      color: #81899a;
    }

    .register-text a {
      color: #1559bd;
      font-weight: bold;
      text-decoration: underline;
      margin-left: 3px;
    }

    .security-footer {
      margin-top: 10px;
      text-align: center;
      color: #798194;
      font-size: 9px;
      line-height: 1.5;
    }

    /* FOOTER */

    .login-footer {
      position: relative;
      z-index: 3;
      min-height: 180px;
      padding: 25px 5% 18px;
      background: #f1f2ff;
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
      gap: 35px;
    }

    .footer-brand h3 {
      font-size: 15px;
      color: #174eaa;
      margin: 0 0 12px;
    }

    .footer-brand p,
    .pro-circle p {
      color: #667086;
      font-size: 10px;
      line-height: 1.7;
    }

    .footer-column h4 {
      font-size: 13px;
      margin: 0 0 12px;
      color: #1d2b43;
    }

    .footer-column a {
      display: block;
      color: #687287;
      font-size: 10px;
      margin: 8px 0;
      cursor: pointer;
    }

    .newsletter {
      display: flex;
      gap: 5px;
    }

    .newsletter input {
      width: 100%;
      min-width: 0;
      border: none;
      border-radius: 5px;
      padding: 8px;
      font-size: 9px;
    }

    .newsletter button {
      border: none;
      background: #1559bd;
      color: white;
      border-radius: 5px;
      padding: 0 12px;
      font-size: 9px;
      cursor: pointer;
    }

    .footer-bottom {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e0e3f1;
      padding-top: 12px;
      margin-top: 5px;
      color: #536078;
      font-size: 9px;
      font-weight: bold;
    }

    .footer-bottom div {
      display: flex;
      gap: 20px;
    }

    .footer-bottom a {
      cursor: pointer;
    }

    /* RESPONSIVE */

    @media (max-width: 768px) {
      .login-overlay {
        height: auto;
        min-height: 560px;
        position: relative;
        padding: 25px 15px;
      }

      .login-modal {
        grid-template-columns: 1fr;
        max-width: 460px;
      }

      .login-banner {
        min-height: 230px;
      }

      .banner-content {
        padding: 20px;
        gap: 18px;
      }

      .banner-subtitle {
        margin-top: -12px;
      }

      .banner-main h1 {
        font-size: 22px;
      }

      .benefit-box {
        display: none;
      }

      .login-form-section {
        padding: 30px 24px;
      }

      .background-page {
        display: none;
      }

      .login-footer {
        grid-template-columns: 1fr 1fr;
        gap: 25px;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .fake-header nav {
        display: none;
      }
    }

    @media (max-width: 400px) {
      .login-footer {
        grid-template-columns: 1fr;
      }

      .footer-bottom div {
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .form-heading h2 {
        font-size: 19px;
      }
    }
  `]
})

export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    matKhau: ['', [Validators.required]],
    remember: [false]
  });

  // Hiện / ẩn mật khẩu
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Quay về trang chủ
  goHome() {
    this.router.navigate(['/']);
  }

  // Xử lý đăng nhập
  onSubmit() {

    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = {
      email: this.loginForm.value.email,
      matKhau: this.loginForm.value.matKhau
    };

    this.authService.login(loginData).subscribe({

      next: () => {
        this.isLoading = false;

        alert('Đăng nhập thành công!');

        this.router.navigate(['/categories']);
      },

      error: (err: any) => {
        this.isLoading = false;

        console.error('Lỗi đăng nhập:', err);

        this.errorMessage =
          'Đăng nhập thất bại! Vui lòng kiểm tra tài khoản và mật khẩu.';
      }

    });
  }
}
