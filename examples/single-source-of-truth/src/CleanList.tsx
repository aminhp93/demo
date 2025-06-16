import { useEffect, useMemo, useState } from "react";

type Item = {
  id: number;
  name: string;
  role: string;
};

const initialItems: Item[] = [
  { id: 1, name: "Alice", role: "Dev" },
  { id: 2, name: "Bob", role: "Design" },
  { id: 3, name: "Charlie", role: "Dev" },
  { id: 4, name: "Diana", role: "QA" },
  { id: 5, name: "Eve", role: "Manager" },
];

export default function CleanList() {
  const [data, setData] = useState<Item[]>(initialItems);

  const [uiState, setUIState] = useState({
    selectedIds: [2, 3],
    highlightId: 4,
    filterRole: null as string | null,
  });

  // ⏱ Simulate realtime updates (delete an item every 5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        if (prev.length <= 3) return prev;
        const toDelete = prev[Math.floor(Math.random() * prev.length)];
        console.log("🔁 Deleting item:", toDelete);
        return prev.filter((item) => item.id !== toDelete.id);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Derived values (SSOT principle)
  const visibleItems = useMemo(() => {
    return data.filter((item) =>
      uiState.filterRole ? item.role === uiState.filterRole : true
    );
  }, [data, uiState.filterRole]);

  const syncedSelectedIds = useMemo(() => {
    const validIds = new Set(data.map((i) => i.id));
    return uiState.selectedIds.filter((id) => validIds.has(id));
  }, [data, uiState.selectedIds]);

  const syncedHighlightId = useMemo(() => {
    return data.some((item) => item.id === uiState.highlightId)
      ? uiState.highlightId
      : null;
  }, [data, uiState.highlightId]);

  const toggleSelect = (id: number) => {
    setUIState((prev) => ({
      ...prev,
      selectedIds: prev.selectedIds.includes(id)
        ? prev.selectedIds.filter((sid) => sid !== id)
        : [...prev.selectedIds, id],
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ List With SSOT + Realtime Deletion</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setUIState((s) => ({ ...s, filterRole: null }))}>
          Show All
        </button>
        <button
          onClick={() => setUIState((s) => ({ ...s, filterRole: "Dev" }))}
        >
          Filter: Dev
        </button>
        <button onClick={() => setUIState((s) => ({ ...s, highlightId: 5 }))}>
          Highlight Eve
        </button>
      </div>

      <ul>
        {visibleItems.map((item) => (
          <li
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            style={{
              cursor: "pointer",
              padding: 8,
              margin: 4,
              border: "1px solid #ccc",
              backgroundColor: syncedSelectedIds.includes(item.id)
                ? "#bbdefb"
                : syncedHighlightId === item.id
                ? "#fff59d"
                : "#fff",
            }}
          >
            {item.name} - {item.role}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <strong>Synced Selected IDs:</strong>{" "}
        {JSON.stringify(syncedSelectedIds)}
        <br />
        <strong>Synced Highlight ID:</strong> {syncedHighlightId}
      </div>
    </div>
  );
}
