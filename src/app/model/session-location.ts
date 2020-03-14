import { BatchSession } from './batch-session';

export class SessionLocation {
    id: number;
    longitude: number;
    latitude: number;
    batchSessions: BatchSession[];
}
