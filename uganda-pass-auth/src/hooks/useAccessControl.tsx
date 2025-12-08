import { Action, Page, permissionsMap, Role } from "@/config/permissions";
import { useMemo } from "react";

export const useAccessControl = (role?: Role) => {

  return useMemo(() => {
    const currentRole = role || "super_admin";

    const canViewNavItem = (page: Page) => {
      return permissionsMap[currentRole]?.[page] !== undefined;
    };

    const canPerformAction = (page: Page, action: Action) => {
      const actions = permissionsMap[currentRole]?.[page] || [];
      return actions.includes(action);
    };

    return {
      canViewNavItem,
      canPerformAction,
      isSuperAdmin: currentRole === "super_admin",
      isAdmin: currentRole === "admin",
      isUser: currentRole === "user",
    };
  }, [role]);
};
