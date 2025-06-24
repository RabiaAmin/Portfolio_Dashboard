import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { clearAllUserErrors, logout } from '@/store/slices/userSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { FolderGit, Home, LogOut, Package, Package2, PanelLeft, PencilRuler, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideBarLink from './components/SideBarLink';
import Dashboard from "./components/Dashboard";
import AddProject from "./components/AddProject";
import AddSkills from "./components/AddSkills";
import Account from "./components/Account";

function HomePage() {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User Logged Out!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className='flex flex-col min-h-screen bg-muted/40'>
      <div className='flex flex-1'>
        <aside className='fixed inset-y-0 left-0 z-50 hidden w-16 flex-col border-r bg-background sm:flex'>
          <nav className='flex flex-col items-center gap-4 px-2 py-5'>
            <Link className='group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full'>
              <Package className='h-6 w-6 transition-all group-hover:scale-110' />
              <span className='sr-only'>Dashboard</span>
            </Link>
            <SideBarLink menu="Dashboard" icon={Home} active={active} setActive={setActive} />
            <SideBarLink menu="Add Project" icon={FolderGit} active={active} setActive={setActive} />
            <SideBarLink menu="Add Skills" icon={PencilRuler} active={active} setActive={setActive} />
            <SideBarLink menu="Account" icon={User} active={active} setActive={setActive} />
          </nav>
          <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5 border-t'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    onClick={handleLogout}
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground hover:text-primary transition-colors md:h-8 md:w-8'
                  >
                    <LogOut className='w-5 h-5' />
                    <span className='sr-only'>Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>

        <div className='flex flex-1 flex-col sm:ml-16 min-w-0'>
          <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6'>
            <Sheet>
              <SheetTrigger asChild>
                <button className='sm:hidden'>
                  <PanelLeft className='w-5 h-5' />
                  <span className='sr-only'>Toggle Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side='left' className='sm:max-w-xs'>
                <nav className='grid gap-6 text-lg font-medium px-4 py-4'>
                  <Link className='group flex h-10 w-10 items-center justify-center rounded-full bg-black text-primary-foreground'>
                    <Package2 className='h-5 w-5 group-hover:scale-110 transition-all' />
                    <span className='sr-only'>Dashboard</span>
                  </Link>
                  <Link to='#' onClick={() => setActive("Dashboard")} className={`${active === "Dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"} flex items-center gap-4 px-2.5`}>
                    <Home className='h-5 w-5' />
                    Dashboard
                  </Link>
                  <Link to='#' onClick={() => setActive("Add Project")} className={`${active === "Add Project" ? "text-foreground" : "text-muted-foreground hover:text-foreground"} flex items-center gap-4 px-2.5`}>
                    <FolderGit className='h-5 w-5' />
                    Add Project
                  </Link>
                  <Link to='#' onClick={() => setActive("Add Skills")} className={`${active === "Add Skills" ? "text-foreground" : "text-muted-foreground hover:text-foreground"} flex items-center gap-4 px-2.5`}>
                    <PencilRuler className='h-5 w-5' />
                    Add Skills
                  </Link>
                  <Link to='#' onClick={() => setActive("Account")} className={`${active === "Account" ? "text-foreground" : "text-muted-foreground hover:text-foreground"} flex items-center gap-4 px-2.5`}>
                    <User className='h-5 w-5' />
                    Account
                  </Link>
                  <Link to='#' onClick={handleLogout} className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                    <LogOut className='h-5 w-5' />
                    Logout
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className='flex items-center gap-4'>
              {user?.avatar?.url && <img src={user.avatar.url} alt='avatar' className='w-10 h-10 rounded-full hidden sm:block' />}
              <h1 className='text-xl sm:text-2xl font-semibold'>Welcome Back, {user.username}</h1>
            </div>
          </header>

          <main className='flex-1 p-4 sm:p-6 min-w-0'>
            {(() => {
              switch (active) {
                case "Dashboard":
                  return <Dashboard />;
                case "Add Project":
                  return <AddProject />;
                case "Add Skills":
                  return <AddSkills />;
                case "Account":
                  return <Account />;
                default:
                  return null;
              }
            })()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
