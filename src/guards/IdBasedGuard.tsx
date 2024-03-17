import { ReactNode, useEffect, useState } from "react";
import { Container, Alert, AlertTitle, Button, Stack } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { getUserInfoId } from "@/utils/utils";

type RoleBasedGuardProp = {
  accessibleIds: String[];
  children: ReactNode | string;
};

export default function IdBasedGuard({
  accessibleIds,
  children,
}: RoleBasedGuardProp) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const [accessible, setAccessible] = useState<boolean>(false);

  useEffect(() => {
    if (
      !(
        accessibleIds?.length !== 0 &&
        !accessibleIds.some((r) => r === userId) &&
        isAuthenticated
      )
    ) {
      setAccessible(true);
    }
  }, [isAuthenticated]);

  if (!accessible) {
    return (
      <div
        style={{ height: "100vh", width: "100vw", margin: "auto" }}
        className="flex items-center justify-center"
      >
        <Container>
          <Alert severity="error" className="flex justify-center">
            <AlertTitle>Permission Denied</AlertTitle>
            You do not have permission to access this page
          </Alert>
          <Stack direction="row" justifyContent="center">
            <Button
              onClick={() => router.push("/")}
              variant="outlined"
              style={{ margin: "0 5px" }}
            >
              Back to home
            </Button>
            <Button
              onClick={logout}
              variant="outlined"
              color="inherit"
              style={{ margin: "0 5px" }}
            >
              Logout
            </Button>
          </Stack>
        </Container>
      </div>
    );
  }

  if (accessible && isAuthenticated) {
    return <>{children}</>;
  }

  return <></>;
}
