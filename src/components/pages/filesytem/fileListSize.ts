/**
 * @interface
 * @param {tableSizeElementInterface} checkbox
 * @param {tableSizeElementInterface} icon
 * @param {tableSizeElementInterface} contextMenu
 * @param {tableSizeElementInterface} name
 * @param {tableSizeElementInterface} modifiedBy
 * @param {tableSizeElementInterface} modifiedOn
 * @param {tableSizeElementInterface} size
 * @param {Object} border
 */

interface tableSizesInterface {
    checkbox: tableSizeElementInterface
    icon: tableSizeElementInterface
    contextMenu: tableSizeElementInterface
    name: tableSizeElementInterface
    modifiedBy: tableSizeElementInterface
    modifiedOn: tableSizeElementInterface
    size: tableSizeElementInterface
    border: { xs: number }
}

/**
 * @interface
 * @param {number} xs
 * @param {number} md
 */
interface tableSizeElementInterface {
    xs: number
    md: number
}

/**
 * Defining the tableSizes object.
 */
const tableSizes: tableSizesInterface = {
    checkbox: {
        xs: 2,
        md: 1,
    },
    icon: {
        xs: 2,
        md: 1,
    },
    contextMenu: {
        xs: 2,
        md: 1,
    },
    name: {
        xs: 6,
        md: 4,
    },
    modifiedBy: {
        xs: 6,
        md: 3,
    },
    modifiedOn: {
        xs: 3,
        md: 1,
    },
    size: {
        xs: 3,
        md: 1,
    },
    border: {
        xs: 12,
    },
}

export default tableSizes
