export const processHashtags = (caption?: string) => {
  if (!caption) return;

  let connectOrCreate;
  const hashtags = caption
    ? caption.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g) ?? []
    : [];
  if (hashtags.length) {
    connectOrCreate = hashtags.map((tag: string) => {
      return {
        where: {
          tag,
        },
        create: {
          tag,
        },
      };
    });
  }
  return connectOrCreate;
};
