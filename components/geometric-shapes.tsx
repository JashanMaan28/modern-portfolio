"use client"

export function GeometricShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Floating Circle 1 */}
      <div 
        className="absolute top-[15%] left-[10%] h-64 w-64 rounded-full border border-white/5 opacity-20 animate-float-slow"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Floating Circle 2 */}
      <div 
        className="absolute top-[45%] right-[5%] h-96 w-96 rounded-full border border-white/5 opacity-20 animate-float-medium"
        style={{ animationDelay: '-5s' }}
      />
      
      {/* Floating Square */}
      <div 
        className="absolute bottom-[15%] left-[20%] h-48 w-48 border border-white/5 opacity-20 animate-float-fast rotate-45"
        style={{ animationDelay: '-10s' }}
      />
    </div>
  )
}
