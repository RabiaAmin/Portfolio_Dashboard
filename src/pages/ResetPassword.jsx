import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useParams } from "react-router-dom";
import SpecialLoadinBtn from "@/pages/components/specialLoadingBtn";
import { clearAllForgotPasswordErrors, resetPassword } from "@/store/slices/forgotResetPasswordSlice";

function ResetPassword() {
  const {token} = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token,password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }

    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div className="bg-foreground flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className=" max-w-sm md:max-w-3xl">
          <div className={cn("flex flex-col gap-6")}>
            <Card className="overflow-hidden p-0">
              <CardContent className="flex justify-center items-center p-0 ">
                <form
                  className=" w-full p-6 md:p-8"
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleResetPassword();
                  }}
                >
                  <div className="flex  flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Reset Password?</h1>
                      <p className="text-muted-foreground text-balance">
                        Login to your dashboard
                      </p>
                    </div>
                    <div className=" grid gap-2">
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        name="password"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password">Confirm New Password</Label>
                      <Input
                        name="confirmPassword"
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Link
                          to="/login"
                          className="ml-auto text-sm underline-offset-2 hover:underline "
                        >
                          Remember your password?
                        </Link>
                      </div>
                    </div>
                    {loading ? (
                      <SpecialLoadinBtn content="Loging In" />
                    ) : (
                      <Button type="submit" className="w-full">
                        Reset Password
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
