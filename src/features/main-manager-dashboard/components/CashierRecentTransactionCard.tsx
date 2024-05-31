import cashierReport from '../../../assets/fakedata/managerdashboardrecenttransactiondata';

const CashierRecentTransactionCard = () => {
  return (
    <div className='w-[600px]'>
      <div className='flex flex-row justify-between items-center mb-8 font-bold'>
        <p className=' font-bold text-lg'>Cashier Reports</p>
        <p className=' text-blueDarker'>View All</p>
      </div>
      <div className='max-h-96 overflow-y-scroll'>
        {cashierReport.map((report) => (
          <div key={report.id}>
            <div className='flex flex-row gap-12 justify-between items-center'>
              <div className='flex flex-row gap-12 items-center'>
                <img
                  src={report.imageUrl}
                  alt='Recent'
                  className='w-12 h-12 rounded-full object-cover'
                />
                <p className='font-semibold'>{report.name}</p>
              </div>

              <div className=' font-semibold gap-2 text-sm'>
                <p>{report.amount1}</p>
                <p className=' text-green-500'>{report.flow}</p>
              </div>
            </div>
            <div className='border-t border-gray w-full my-2'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashierRecentTransactionCard;
