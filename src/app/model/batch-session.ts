import { Batch } from './batch';
import { SessionLocation } from './session-location';

export class BatchSession {
    id: string;
    sessionId: string;
    attendanceCode: string;
    triggerd: boolean;
    batch: Batch;
    sessionLocation: SessionLocation;
}
