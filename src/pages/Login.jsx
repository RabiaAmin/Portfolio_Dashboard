import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAllUserErrors, login } from '@/store/slices/userSlice'
import SpecialLoadinBtn from '@/pages/components/specialLoadingBtn'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, isAuthenticated, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleLogin = () => {
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }

    if (isAuthenticated) {
      navigateTo("/")
    }
  }, [dispatch, isAuthenticated, error, loading])

  return (
    <div className="bg-foreground flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                className="p-6 md:p-8"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleLogin()
                }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your dashboard
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/password/forgot"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      type="password"
                      required
                    />
                  </div>
                  {
                    loading ? <SpecialLoadinBtn content="Loging In" /> :
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  }
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="./assets/images/loginImg.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 dark:brightness-[0.2] dark:grayscale"
                />
              </div>
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
  )
}

export default Login
