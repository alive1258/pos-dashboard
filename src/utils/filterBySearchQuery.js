export const filterBySearchQuery = (data, searchQuery) => {
  return data?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
};
