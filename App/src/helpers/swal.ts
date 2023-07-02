import * as Swal from "sweetalert2";

export const invokeSwal = (toInvoke: Record<string, unknown>): void => (Swal as any).fire(toInvoke);
