const master: Menu[] = [
    {
        key: 'Master Raw Data',
        label: 'Master Raw Data',
        path: '/data'
    },
]

const laporan: Menu[] = [
    {
        key: 'Riwayat Scan',
        label: 'Riwayat Scan',
        path: '/history'
    },
]


export interface Menu {
    key: string,
    label: string,
    path?: string,
}

export {master,laporan}