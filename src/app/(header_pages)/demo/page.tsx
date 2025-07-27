// app/demo/page.tsx

export default function DemoOrnateFlourish() {
  return (
    <div className="min-h-screen bg-[oklch(34%_0.06_165)] flex items-center justify-center p-8">
      <div className="relative w-[600px] h-[600px]">
        <FloralVine top="10%" left="50%" rotate="0" />
        <FloralVine top="50%" left="10%" rotate="-90" />
        <FloralVine top="90%" left="50%" rotate="180" />
        <FloralVine top="50%" left="90%" rotate="90" />
        <CenterBloom />
      </div>
    </div>
  );
}

function FloralVine({ top, left, rotate }: { top: string; left: string; rotate: string }) {
  return (
    <div
      className="absolute w-56 h-56"
      style={{
        top,
        left,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    >
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          className="absolute border-[6px] border-[oklch(72.3%_0.14_85)] rounded-full"
          style={{
            width: `${140 - i * 30}px`,
            height: `${140 - i * 30}px`,
            top: `${i * 10}px`,
            left: `${i * 10}px`,
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
        />
      ))}
      <div className="absolute w-3 h-3 bg-[oklch(72.3%_0.14_85)] rounded-full top-[80%] left-[80%]"></div>
    </div>
  );
}

function CenterBloom() {
  return (
    <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-10 bg-[oklch(72.3%_0.14_85)] rounded-t-full"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -100%) rotate(${i * 60}deg)`
          }}
        />
      ))}
      <div className="absolute w-4 h-4 bg-[oklch(72.3%_0.14_85)] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
