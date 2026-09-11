import ComboLove from "./combo-love";
import ExtraServices from "./extra-services";

export default function ComboSections() {
  return (
    <section
      id="combo-love"
      className="scroll-mt-20 w-full overflow-x-hidden px-4 pb-10 pt-4 sm:px-6 md:px-10 md:pb-12 md:pt-6 lg:px-[5.5rem] xl:px-24"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 md:gap-12">
        <ComboLove />
        <ExtraServices />
      </div>
    </section>
  );
}
