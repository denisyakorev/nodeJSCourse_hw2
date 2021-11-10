export const Permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] as const;

export type Group = {
    id: string;
    name: string;
    permissions: typeof Permissions[number];
};