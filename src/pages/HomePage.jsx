

import { clearAllUserErrors } from '@/store/slices/userSlice';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; 
import { Home, Package } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function HomePage() {
  const [active,setActive] = useState("");
  const {isAuthenticated,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  // const handleLogout = ()=>{
  //   dispatch(logout());
  //   toast.success("User Logged Out!");
  // }
  const navigateTo = useNavigate();
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if(!isAuthenticated){
      navigateTo("/login");
    }
  },[isAuthenticated]);
  return (
   <>
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
     <aside className='fixed inset-y-0 hidden w-20 flex-col border-r bg-background sm:flex z-50 '>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link className='group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full'>
        <Package className='h-4 w-4 transition-all group-hover:scale-110' />
        <span className='sr-only'>Dashboard</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
               <Link className={`flex h-9 items-center justify-center rounded-lg  ${active === "Dashboard" ? "text-accent-foreground bg-foreground":"text-muted-foreground"} transition-colors hover:text-foreground md:h8 md:w-8`}>
               <Home className='w-5 h-5' />
               <span className='sr-only'>Dashboard</span>
               </Link>
            </TooltipTrigger>
            <TooltipContent side='right' >
              Dashboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

     </aside>
    </div>
   </>
  )
}

export default HomePage