import { FsEntity } from "../../../../background/api/filesystemTypes"

export interface DropdownItemTitleInterface {
    icon?: string
    description: string
    fsEntity: FsEntity
    target?: string
    onclick?: () => void
    disabled?: boolean
}
