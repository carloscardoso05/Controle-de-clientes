export default function showModal(modalId: string) {
    (document.querySelector('#' + modalId) as any).showModal()
}