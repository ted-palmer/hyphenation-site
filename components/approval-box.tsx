import Button from './common/button';

const ApprovalBox = () => {
  return (
    <div>
      <div className="flex w-full max-w-[38rem] flex-col items-center space-y-4 rounded-3xl bg-black p-6 p-9">
        <div className="text-2xl font-medium text-white">ENABLE REDEMPTIONS</div>
        <div className="text-center text-xs text-white md:text-sm">
          Approve your Adoption Tickets to enable redemption.
        </div>
        <Button color="blue">APPROVE ALL</Button>
      </div>
    </div>
  );
};

export default ApprovalBox;
