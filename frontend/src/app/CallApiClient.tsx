'use client';

import { useState } from 'react';
import axios from '@/lib/axiosInstance';

export function CallApiClient({ instanceId }: { instanceId: string }) {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	console.log('FE → BE API_URL:', process.env.NEXT_PUBLIC_API_URL);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await axios.get('/huy');
			setData(res.data);
		} catch (err) {
			console.error('API /huy failed', err);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-white rounded p-4 border'>
			<p className='mb-2 text-black'>
				🆔 FE Instance ID: <strong>{instanceId}</strong>
			</p>

			<button
				onClick={fetchData}
				disabled={loading}
				className='bg-amber-800 text-while px-4 py-2 rounded hover:bg-blue-700'
			>
				{loading ? 'Loading...' : 'Call API'}
			</button>

			{data && (
				<ul className='mt-4 text-sm text-black'>
					<li>📦 BE Instance: {data.instance}</li>
					<li>🔁 Count: {data.requestCount}</li>
				</ul>
			)}
		</div>
	);
}
