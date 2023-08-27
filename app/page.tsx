import Icons from "@/components/Icons"
import WavingHand from "@/components/WavingHand"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-md sm:text-xl">
          Hi <WavingHand />, my name is
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">
          Kian Bazarjani.
        </h1>
      </div>

      <Icons />

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-5">
            About Me
          </h1>
          <div className="flex flex-col gap-4 text-sm sm:text-base">
            <p>Hello, I'm Kian.</p>
            <p>
              I come from a diverse background that has greatly influenced who I
              am today.
            </p>
            <p>
              With a degree in Computer Science, I've always had a passion for
              building things - starting with complex redstone machinery in
              Minecraft, all the way to full-stack web development in Next.js.
            </p>
            <p>
              My journey has taken me through various roles, each teaching me
              something valuable along the way.
            </p>
          </div>
        </div>

        {/* <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">
            Projects
          </h1>
          <div></div>
        </div> */}
      </div>
    </main>
  )
}
