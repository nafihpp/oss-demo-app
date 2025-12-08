import { ReactNode } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { APP_INFO } from '@/constants/auth';

interface AuthLayoutProps {
  children: ReactNode;
  showCancelButton?: boolean;
  onCancel?: () => void;
  rightSideImage?: string;
  rightSideImageAlt?: string;
  rightSideImageWidth?: number;
  rightSideImageHeight?: number;
  rightSideImageClass?: string;
}

export default function AuthLayout({
  children,
  showCancelButton = false,
  onCancel,
  rightSideImage = '/phone-image.svg',
  rightSideImageAlt = 'Phone',
  rightSideImageWidth = 643,
  rightSideImageHeight = 620,
  rightSideImageClass = 'w-full h-auto object-contain',
}: AuthLayoutProps) {
  return (
    <section className="min-h-screen bg-[#0C2B25] flex items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto w-full space-y-6">
        <Card 
          className="h-auto !border-0 !pb-0 !rounded-4xl" 
          style={{ backgroundImage: 'url(/background-login.svg)' }}
        >
          <CardHeader className="border-b flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                src="/app-icon.svg"
                alt="App Icon"
                width={42}
                height={42}
              />
              <div>
                <CardTitle>{APP_INFO.NAME}</CardTitle>
                <CardDescription>{APP_INFO.SUBTITLE}</CardDescription>
              </div>
            </div>
            {showCancelButton && onCancel && (
              <Button
                variant="ghost"
                onClick={onCancel}
                className="text-red-600 w-[160px] !cursor-pointer !h-10 hover:text-red-700 border-red-700 border font-semibold rounded-full"
              >
                Cancel
              </Button>
            )}
          </CardHeader>

          <CardContent className="flex flex-col lg:flex-row justify-between h-full !px-8 !pb-0">
            <div className="w-full lg:w-3/4">
              {children}
            </div>
            
            <div className="w-full flex justify-center lg:justify-end">
               <Image
                  src={rightSideImage}
                  alt={rightSideImageAlt}
                  width={rightSideImageWidth}
                  height={rightSideImageHeight}
                  className={rightSideImageClass}
                />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}