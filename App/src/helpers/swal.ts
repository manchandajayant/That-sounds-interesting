import * as Swal from "sweetalert2";

export const invokeSwal = (toInvoke: {}): void => {
    (Swal as any).fire(toInvoke);
};
