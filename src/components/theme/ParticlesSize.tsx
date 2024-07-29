const ParticlesSize = ({
  uSize,
  setuSize,
}: {
  uSize: number;
  setuSize: (val: number) => void;
}) => {
  return (
    <div>
      <div className="">size: {uSize}</div>
      <input
        className="border-0 outline-0 w-full bg-neutral-950"
        aria-label="pick a size for particles"
        type="range"
        min="2"
        max="20"
        step="1"
        value={uSize}
        onChange={e => setuSize(Number(e.currentTarget.value))}
      />
      <div className="flex justify-between items-center">
        <p>2</p>
        <p>20</p>
      </div>
    </div>
  );
};

export default ParticlesSize;
