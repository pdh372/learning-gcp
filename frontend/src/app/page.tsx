'use client';

import { useState } from 'react';
import axios from '@/lib/axiosInstance';
import { instanceId } from '@/lib/uuid';

export default function Page() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await axios.get('/huy');
			setData(res.data);
		} catch (err) {
			console.error('Failed to fetch /huy', err);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
			<div className='bg-white shadow-lg rounded-xl px-4 py-7 w-full max-w-md border border-gray-200'>
				<h1 className='text-xl font-semibold text-gray-800 mb-4'>
					🎯 Response from <code>/huy</code> API
				</h1>
				<h2 className='text-xl font-semibold text-gray-800 mb-4'>
					🆔 Instance ID: <strong>{instanceId}</strong>
				</h2>

				<button
					onClick={fetchData}
					className='mb-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50'
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Call API'}
				</button>

				{data ? (
					<ul className='space-y-3'>
						<li className='flex justify-between border-b pb-1'>
							<span className='font-medium text-gray-600'>
								📦 Instance ID
							</span>
							<span className='text-gray-900 text-right break-all'>
								{data.instance}
							</span>
						</li>
						<li className='flex justify-between border-b pb-1'>
							<span className='font-medium text-gray-600'>
								🔁 Request Count
							</span>
							<span className='text-gray-900'>
								{data.requestCount}
							</span>
						</li>
					</ul>
				) : (
					!loading && (
						<p className='text-gray-500 italic'>Empty Data</p>
					)
				)}
			</div>
		</main>
	);
}
