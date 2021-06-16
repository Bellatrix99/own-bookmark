const BACKUP_IMAGE_URL_MAPPER = {
    production: '',
    development: require('@/assets/icon.png'),
    others: require('@/assets/icon.png'),
}

export const imageOptions = {
    // 图片失效备用 URL，根据不同环境使用不同 URL
    failureImageURL: BACKUP_IMAGE_URL_MAPPER[process.env.NODE_ENV] || BACKUP_IMAGE_URL_MAPPER.others
}
