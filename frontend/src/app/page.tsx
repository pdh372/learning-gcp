import { getInstanceId } from '../lib/serverInstance';
import { CallApiClient } from './CallApiClient';

export default function Page() {
	const instanceId = getInstanceId();

	return (
		<main className='min-h-screen flex items-center justify-center bg-gray-50'>
			<CallApiClient instanceId={instanceId} />
		</main>
	);
}
