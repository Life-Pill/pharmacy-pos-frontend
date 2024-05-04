import transactionDetails from '../../../../assets/fakedata/transactiondetails';

const LatestTransactionDetails = () => {
  return (
    <div className=' w-[600px]'>
      <div className='flex flex-row justify-between items-center mb-8 font-bold'>
        <p className=' font-bold text-lg'>Latest Transactions</p>
        <p className=' text-blueDarker'>View All</p>
      </div>
      <div className='border-s border-gray-200 dark:border-gray-700  max-h-96 overflow-y-scroll'>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {/* Mapping through each transaction and rendering them as timeline items */}
          {transactionDetails.map((transaction) => (
            <li key={transaction.id}>
              <div className='py-4 '>
                <div className='flex space-x-3'>
                  <div className='flex-shrink-0'>
                    <div className='flex items-center justify-center h-4 w-4 rounded-full bg-blueDarker text-white'>
                      {/* Render a simple dot as timeline marker */}
                      &bull;
                    </div>
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='text-sm text-gray dark:text-gray-400'>
                      {transaction.date.toLocaleDateString()}
                    </div>
                    <p className='text-md font-semibold dark:text-white truncate'>
                      {transaction.description}
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      ${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LatestTransactionDetails;
