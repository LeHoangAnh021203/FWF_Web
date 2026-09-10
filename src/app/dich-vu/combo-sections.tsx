import ComboIndepth from "./combo-indepth";
import ComboLove from "./combo-love";
import ExtraServices from "./extra-services";

export default function ComboSections() {
  return (
    <section
      id="combo-love"
      className="scroll-mt-20 w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,#ffe0c4_0%,#fff7ef_42%,#ffffff_100%)] px-4 pb-10 pt-10 sm:px-6 md:px-10 md:pb-12 md:pt-14 lg:px-[5.5rem] xl:px-24"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 md:gap-12">
        <ComboLove />
        <ComboIndepth />
        <ExtraServices />
      </div>
    </section>
  );
}
