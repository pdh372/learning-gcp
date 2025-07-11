let instanceId = process.env.INSTANCE_ID;

if (!instanceId) {
	instanceId = `fe-${Math.random().toString(36).substring(2, 6)}`;
}

export function getInstanceId(): string {
	return instanceId ?? 'unknown';
}
