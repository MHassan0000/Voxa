"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "#0e0e14",
          "--normal-text": "#e4e4e7",
          "--normal-border": "rgba(255, 255, 255, 0.06)",
          "--border-radius": "0.75rem",
          "--success-bg": "#0e0e14",
          "--success-text": "#4ade80",
          "--success-border": "rgba(74, 222, 128, 0.15)",
          "--error-bg": "#0e0e14",
          "--error-text": "#ef4444",
          "--error-border": "rgba(239, 68, 68, 0.15)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
