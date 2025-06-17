import { useEffect, useState } from 'react';

type Item = {
  id: number;
  name: string;
  role: string;
};

const initialItems: Item[] = [
  { id: 1, name: 'Alice', role: 'Dev' },
  { id: 2, name: 'Bob', role: 'Design' },
  { id: 3, name: 'Charlie', role: 'Dev' },
  { id: 4, name: 'Diana', role: 'QA' },
  { id: 5, name: 'Eve', role: 'Manager' },
];

export default function BrokenList() {
  const [data, setData] = useState<Item[]>(initialItems);
  const [filteredItems, setFilteredItems] = useState<Item[]>(initialItems);
  const [selectedIds, setSelectedIds] = useState<number[]>([2, 3]);
  const [highlightId, setHighlightId] = useState<number | null>(4);
  const [filterRole, setFilterRole] = useState<string | null>(null);

  // ❌ Manual filtering logic on state
  useEffect(() => {
    const filtered = filterRole
      ? data.filter((item) => item.role === filterRole)
      : data;
    setFilteredItems(filtered);
  }, [data, filterRole]);

  // // ❌ Realtime update, deletes a random item every 5s
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setData((prev) => {
  //       if (prev.length <= 3) return prev;
  //       const toDelete = prev[Math.floor(Math.random() * prev.length)];
  //       console.log('❌ Deleting item:', toDelete);

  //       const newData = prev.filter((item) => item.id !== toDelete.id);
  //       // ❌ Forget to update selectedIds / highlightId → causes UI bugs
  //       return newData;
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔴 Broken List Example (Manual Sync)</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setFilterRole(null)}>Show All</button>
        <button onClick={() => setFilterRole('Dev')}>Filter: Dev</button>
        <button onClick={() => setHighlightId(5)}>Highlight Eve</button>
      </div>

      <ul>
        {filteredItems.map((item) => (
          <li
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            style={{
              cursor: 'pointer',
              padding: 8,
              margin: 4,
              border: '1px solid #ccc',
              backgroundColor: selectedIds.includes(item.id)
                ? '#bbdefb'
                : highlightId === item.id
                  ? '#fff59d'
                  : '#fff',
            }}
          >
            {item.name} - {item.role}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <strong>Selected IDs (NOT synced):</strong>{' '}
        {JSON.stringify(selectedIds)}
        <br />
        <strong>Highlight ID (NOT synced):</strong> {highlightId}
      </div>
    </div>
  );
}
