interface tableSizesInterface {
    checkbox:tableSizeElementInterface,
    icon: tableSizeElementInterface,
    contextMenu: tableSizeElementInterface,
    name: tableSizeElementInterface,
    modifiedBy: tableSizeElementInterface,
    modifiedOn: tableSizeElementInterface,
    size: tableSizeElementInterface,
    border: {xs: number}
}

interface tableSizeElementInterface {
    xs: number,
    md: number
}

const tableSizes:tableSizesInterface = {
    checkbox : {
        xs : 2,
        md : 1
    } ,
    icon : {
        xs: 2,
        md: 1
    },
    contextMenu: {
        xs: 2,
        md: 1
    },
    name: {
        xs: 6,
        md: 4
    },
    modifiedBy: {
        xs: 6,
        md: 3
    },
    modifiedOn: {
        xs: 3,
        md: 1
    },
    size: {
        xs: 3,
        md: 1
    },
    border: {
        xs: 12
    }

}

export default tableSizes;