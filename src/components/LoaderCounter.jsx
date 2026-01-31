export function LoaderCounter({ value }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#f6f7f2]">
      <div className="absolute bottom-6 left-6 text-[72px] font-light text-black/30 leading-none">
        {value}
      </div>
    </div>
  );
}
