"use client"

import { useEffect, useRef, useState } from "react"
import type { Viewer } from "photo-sphere-viewer"
import "photo-sphere-viewer/dist/photo-sphere-viewer.css"

interface PanoramaViewerProps {
  imageUrl: string
  height?: string | number
  width?: string | number
  className?: string
}

export default function PanoramaViewer({
  imageUrl,
  height = "500px",
  width = "100%",
  className = "",
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current && !viewerRef.current) {
      import("photo-sphere-viewer").then(({ Viewer }) => {
        try {
          viewerRef.current = new Viewer({
            container: containerRef.current!,
            panorama: imageUrl,
            size: {
              width: containerRef.current?.clientWidth ?? 0,
              height: containerRef.current?.clientHeight ?? 0,
            },
            navbar: ["autorotate", "zoom", "fullscreen"],
            defaultZoomLvl: 0,
            mousewheel: true,
            touchmoveTwoFingers: true,
            autorotateDelay: 3000,
            autorotateSpeed: "1rpm",
          })

          // Adicionar eventos
          viewerRef.current.once("ready", () => {
            setIsLoaded(true)
            setIsLoading(false)
          })

          // photo-sphere-viewer does not have a documented "error" event.
          // Instead, handle errors via the catch block below.

        } catch (error) {
          console.error("Erro ao inicializar o visualizador 360°:", error)
          setIsLoading(false)
        }
      })
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [imageUrl])

  return (
    <div className={`relative ${className}`} style={{ height, width }}>
      <div ref={containerRef} className="w-full h-full rounded-2xl overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] rounded-2xl z-10">
            <div className="text-center text-white">
              <div className="w-24 h-24 mx-auto mb-4 bg-[#3655d4]/20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#3655d4] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Vista 360°</h3>
              <p className="text-[#a0a0a0] mb-4">Carregando experiência imersiva...</p>
              <div className="text-sm text-[#666]">Use o mouse para navegar • Scroll para zoom</div>
            </div>
          </div>
        )}
      </div>

      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm z-20">
          🔄 Arraste para girar • 🔍 Scroll para zoom
        </div>
      )}
    </div>
  )
}
