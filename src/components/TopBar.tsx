import ThemeToggler from "@/components/ThemeToggeler";

export default function TopBar() {
  return(
    <nav className="sticky top-0 z-50 border-b-2 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex">
        {/* todo: remove redundant css */}
        <div className="flex-1 h-12 grid grid-cols-2 text-center items-center">
          <p className="font-semibold h-12 flex items-center justify-center">Public</p>
          <p className="border-l h-12 flex items-center justify-center">Following</p>
        </div>
        <ThemeToggler/>
      </div>
    </nav>
  );
}