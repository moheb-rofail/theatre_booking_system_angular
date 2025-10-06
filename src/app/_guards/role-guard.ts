import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth';


export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const isAdmin = authService.isAdmin();
  const allowedRoles = route.data['roles'] as string[];

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  // ✅ الأدمن يدخل في كل الحالات
  if (isAdmin) {
    return true;
  }

   // 👇 باقي المستخدمين
  if (allowedRoles.includes('user')) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};