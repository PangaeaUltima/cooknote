import { useNotification } from "@kyvg/vue3-notification";

export function handleError(error) {
  const { notify } = useNotification();

  console.error(error);

  notify({
    text: 'There was an error. Open the console to view detailed information.',
    type: 'error bg-error'
  });
}