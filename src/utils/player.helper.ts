export const getDurationString = (duration: number): string => {
    const hours = Math.floor(duration / 60 / 60);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = Math.floor(duration - hours * 3600 - minutes * 60);
    return `${hours !== 0 ? hours + ':': ''}${hours !== 0 ? minutes < 10 ? '0' + minutes : minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};