"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, SimpleGrid, Heading, Text, Flex, Button,
  VStack, HStack, Badge, Image, Input, Spinner, Textarea, Select,
  Table, Thead, Tbody, Tr, Th, Td,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers, FaEnvelope, FaNewspaper, FaBlog, FaSignOutAlt, FaShieldAlt,
  FaHeart, FaComment, FaBan, FaTrash, FaEye, FaPlus, FaTimes, FaCheck,
  FaChartBar, FaBell,
} from "react-icons/fa";
import {
  getAdminDashboard, adminGetUsers, adminToggleBanUser, adminDeleteUser,
  adminGetContacts, adminMarkContactRead, adminGetSubscribers,
  adminGetBlogPosts, adminCreateBlogPost, adminDeleteBlogPost,
  adminLogout, getAdminToken,
} from "@/lib/api";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);

// ── Stat Card ───────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, subLabel }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      bg="white" rounded="xl" shadow="sm"
      border="1px solid" borderColor="gray.100"
      p={5}
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>{label}</Text>
          <Heading size="xl" color="gray.900">{value ?? "—"}</Heading>
          {subLabel && <Text fontSize="xs" color="gray.400" mt={1}>{subLabel}</Text>}
        </Box>
        <Box
          w="44px" h="44px" rounded="lg"
          bg={color + "15"}
          display="flex" alignItems="center" justifyContent="center"
          color={color} fontSize="18px"
        >
          {icon}
        </Box>
      </Flex>
    </MotionBox>
  );
}

// ── Sidebar nav ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <FaChartBar /> },
  { key: "users", label: "Users", icon: <FaUsers /> },
  { key: "contacts", label: "Contacts", icon: <FaEnvelope /> },
  { key: "newsletter", label: "Newsletter", icon: <FaBell /> },
  { key: "blog", label: "Blog", icon: <FaBlog /> },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dashData, setDashData] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", content: "", category: "Faith & Relationships", published: false });
  const [postSubmitting, setPostSubmitting] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push("/admin");
      return;
    }
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [dash, usersData, contactsData, subsData, blogsData] = await Promise.all([
        getAdminDashboard(),
        adminGetUsers(),
        adminGetContacts(),
        adminGetSubscribers(),
        adminGetBlogPosts(),
      ]);
      setDashData(dash);
      setUsers(usersData.users || []);
      setContacts(contactsData.contacts || []);
      setSubscribers(subsData.subscribers || []);
      setBlogPosts(blogsData.posts || []);
    } catch (err) {
      console.error("Admin load error:", err);
      if (err.status === 401) router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (userId) => {
    const data = await adminToggleBanUser(userId);
    setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, isBanned: data.isBanned } : u));
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Permanently delete this user?")) return;
    await adminDeleteUser(userId);
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleMarkRead = async (contactId) => {
    await adminMarkContactRead(contactId);
    setContacts((prev) => prev.map((c) => c._id === contactId ? { ...c, read: true } : c));
  };

  const handleDeletePost = async (postId) => {
    if (!confirm("Delete this blog post?")) return;
    await adminDeleteBlogPost(postId);
    setBlogPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setPostSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(newPost).forEach(([k, v]) => fd.append(k, v));
      const data = await adminCreateBlogPost(fd);
      setBlogPosts((prev) => [data.post, ...prev]);
      setShowBlogForm(false);
      setNewPost({ title: "", excerpt: "", content: "", category: "Faith & Relationships", published: false });
    } catch (err) {
      alert(err.message || "Failed to create post.");
    } finally {
      setPostSubmitting(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    router.push("/admin");
  };

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Spinner size="xl" color="#ff0036" />
      </Flex>
    );
  }

  const stats = dashData?.stats || {};

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* Sidebar */}
      <Box
        w="240px" bg="white" borderRight="1px solid" borderColor="gray.100"
        shadow="sm" flexShrink={0}
        display={{ base: "none", md: "block" }}
      >
        {/* Logo */}
        <Box p={6} borderBottom="1px solid" borderColor="gray.100">
          <Flex align="center" gap={3}>
            <Box
              w="36px" h="36px" bg="#ff0036" rounded="lg"
              display="flex" alignItems="center" justifyContent="center"
              color="white" fontSize="14px"
            >
              <FaShieldAlt />
            </Box>
            <Box>
              <Heading size="xs" color="gray.900">Admin Panel</Heading>
              <Text fontSize="10px" color="gray.400">AfroFaithMatch</Text>
            </Box>
          </Flex>
        </Box>

        {/* Nav */}
        <VStack align="stretch" p={3} gap={1} mt={2}>
          {NAV_ITEMS.map((item) => (
            <Flex
              key={item.key}
              as="button"
              align="center"
              gap={3}
              px={3} py={2.5}
              rounded="lg"
              bg={activeSection === item.key ? "#ff0036" : "transparent"}
              color={activeSection === item.key ? "white" : "gray.600"}
              fontWeight={activeSection === item.key ? "600" : "normal"}
              fontSize="sm"
              onClick={() => setActiveSection(item.key)}
              _hover={{ bg: activeSection === item.key ? "#d4002d" : "gray.50" }}
              transition="all 0.15s"
              w="full"
              textAlign="left"
            >
              {item.icon} {item.label}
              {item.key === "contacts" && stats.unreadContacts > 0 && (
                <Badge ml="auto" bg="red.500" color="white" rounded="full" fontSize="9px" px={1.5}>
                  {stats.unreadContacts}
                </Badge>
              )}
            </Flex>
          ))}
        </VStack>

        {/* Logout */}
        <Box p={3} mt="auto">
          <Button
            w="full" variant="ghost" color="gray.500"
            leftIcon={<FaSignOutAlt />}
            onClick={handleLogout}
            _hover={{ bg: "red.50", color: "#ff0036" }}
            size="sm"
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box flex={1} overflow="auto">
        <Box px={{ base: 4, md: 8 }} py={6}>

          {/* ── Dashboard ─────────────────────────────────────────── */}
          {activeSection === "dashboard" && (
            <Box>
              <Heading size="lg" color="gray.900" mb={1}>Dashboard</Heading>
              <Text color="gray.500" mb={6} fontSize="sm">Welcome back, Admin 👋</Text>

              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4} mb={8}>
                <StatCard label="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="#ff0036" subLabel={`${stats.bannedUsers} banned`} />
                <StatCard label="Blog Posts" value={stats.totalBlogPosts} icon={<FaBlog />} color="#6366f1" subLabel={`${stats.publishedPosts} published`} />
                <StatCard label="Contacts" value={stats.totalContacts} icon={<FaEnvelope />} color="#f59e0b" subLabel={`${stats.unreadContacts} unread`} />
                <StatCard label="Subscribers" value={stats.totalSubscribers} icon={<FaBell />} color="#10b981" subLabel={`${stats.activeSubscribers} active`} />
                <StatCard label="Interests Sent" value={stats.totalInterests} icon={<FaHeart />} color="#ec4899" subLabel={`${stats.acceptedMatches} matched`} />
                <StatCard label="Messages" value={stats.totalMessages} icon={<FaComment />} color="#3b82f6" />
              </SimpleGrid>

              {/* Recent users */}
              <Box bg="white" rounded="xl" shadow="sm" border="1px solid" borderColor="gray.100" p={5} mb={6}>
                <Heading size="sm" color="gray.800" mb={4}>Recent Users</Heading>
                <VStack align="stretch" gap={3}>
                  {dashData?.recentUsers?.map((u) => (
                    <Flex key={u._id} align="center" gap={3}>
                      <Image
                        src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=ff0036&color=fff&size=36`}
                        w="36px" h="36px" rounded="full" objectFit="cover"
                      />
                      <Box flex={1}>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">{u.name}</Text>
                        <Text fontSize="xs" color="gray.400">{u.email}</Text>
                      </Box>
                      {u.isBanned && <Badge colorScheme="red" fontSize="10px">Banned</Badge>}
                      <Text fontSize="xs" color="gray.400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Box>
          )}

          {/* ── Users ─────────────────────────────────────────────── */}
          {activeSection === "users" && (
            <Box>
              <Heading size="lg" color="gray.900" mb={1}>User Management</Heading>
              <Text color="gray.500" mb={6} fontSize="sm">{users.length} total users</Text>

              <Box bg="white" rounded="xl" shadow="sm" border="1px solid" borderColor="gray.100" overflow="hidden">
                <Box overflowX="auto">
                  <Table.Root size="sm">
                    <Table.Header>
                      <Table.Row bg="gray.50">
                        <Table.ColumnHeader pl={5} py={3} fontSize="xs" color="gray.500">User</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Email</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Joined</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Status</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Actions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {users.map((u) => (
                        <Table.Row key={u._id} _hover={{ bg: "gray.50" }}>
                          <Table.Cell pl={5} py={3}>
                            <Flex align="center" gap={2.5}>
                              <Image
                                src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=ff0036&color=fff&size=32`}
                                w="32px" h="32px" rounded="full" objectFit="cover"
                              />
                              <Text fontSize="sm" fontWeight="medium" color="gray.800" noOfLines={1}>{u.name}</Text>
                            </Flex>
                          </Table.Cell>
                          <Table.Cell>
                            <Text fontSize="xs" color="gray.500">{u.email}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Text fontSize="xs" color="gray.400">{new Date(u.createdAt).toLocaleDateString()}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge
                              colorScheme={u.isBanned ? "red" : "green"}
                              fontSize="10px" px={2} py={0.5} rounded="full"
                            >
                              {u.isBanned ? "Banned" : "Active"}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            <HStack gap={1}>
                              <Button
                                size="xs"
                                variant="ghost"
                                color={u.isBanned ? "green.600" : "orange.500"}
                                onClick={() => handleBanToggle(u._id)}
                                _hover={{ bg: u.isBanned ? "green.50" : "orange.50" }}
                              >
                                <FaBan />
                              </Button>
                              <Button
                                size="xs"
                                variant="ghost"
                                color="red.500"
                                onClick={() => handleDeleteUser(u._id)}
                                _hover={{ bg: "red.50" }}
                              >
                                <FaTrash />
                              </Button>
                            </HStack>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Box>
            </Box>
          )}

          {/* ── Contacts ──────────────────────────────────────────── */}
          {activeSection === "contacts" && (
            <Box>
              <Heading size="lg" color="gray.900" mb={1}>Contact Submissions</Heading>
              <Text color="gray.500" mb={6} fontSize="sm">{contacts.filter(c => !c.read).length} unread</Text>

              <VStack align="stretch" gap={3}>
                {contacts.map((contact) => (
                  <Box
                    key={contact._id}
                    bg="white" rounded="xl" shadow="sm"
                    border="1px solid" borderColor={contact.read ? "gray.100" : "#ff0036"}
                    p={5}
                  >
                    <Flex justify="space-between" align="flex-start" mb={2}>
                      <Box>
                        <Flex align="center" gap={2}>
                          <Heading size="sm" color="gray.900">{contact.name}</Heading>
                          {!contact.read && (
                            <Badge bg="#ff0036" color="white" fontSize="9px" px={1.5} rounded="sm">NEW</Badge>
                          )}
                        </Flex>
                        <Text fontSize="xs" color="gray.400">{contact.email} · {new Date(contact.createdAt).toLocaleDateString()}</Text>
                      </Box>
                      {!contact.read && (
                        <Button
                          size="xs" variant="ghost" color="green.600"
                          onClick={() => handleMarkRead(contact._id)}
                          leftIcon={<FaCheck />}
                        >
                          Mark Read
                        </Button>
                      )}
                    </Flex>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1}>{contact.subject}</Text>
                    <Text fontSize="sm" color="gray.500" lineHeight="1.6">{contact.message}</Text>
                  </Box>
                ))}
                {contacts.length === 0 && (
                  <Box textAlign="center" py={16} color="gray.400">
                    <Text fontSize="3xl" mb={2}>📭</Text>
                    <Text>No contact submissions yet.</Text>
                  </Box>
                )}
              </VStack>
            </Box>
          )}

          {/* ── Newsletter ────────────────────────────────────────── */}
          {activeSection === "newsletter" && (
            <Box>
              <Heading size="lg" color="gray.900" mb={1}>Newsletter Subscribers</Heading>
              <Text color="gray.500" mb={6} fontSize="sm">{subscribers.filter(s => s.active).length} active subscribers</Text>

              <Box bg="white" rounded="xl" shadow="sm" border="1px solid" borderColor="gray.100" overflow="hidden">
                <Box overflowX="auto">
                  <Table.Root size="sm">
                    <Table.Header>
                      <Table.Row bg="gray.50">
                        <Table.ColumnHeader pl={5} py={3} fontSize="xs" color="gray.500">Email</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Name</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Subscribed</Table.ColumnHeader>
                        <Table.ColumnHeader fontSize="xs" color="gray.500">Status</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {subscribers.map((s) => (
                        <Table.Row key={s._id} _hover={{ bg: "gray.50" }}>
                          <Table.Cell pl={5} py={3}>
                            <Text fontSize="sm" color="gray.800">{s.email}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Text fontSize="sm" color="gray.500">{s.name || "—"}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Text fontSize="xs" color="gray.400">{new Date(s.createdAt).toLocaleDateString()}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge colorScheme={s.active ? "green" : "gray"} fontSize="10px" rounded="full">
                              {s.active ? "Active" : "Unsubscribed"}
                            </Badge>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Box>
            </Box>
          )}

          {/* ── Blog ──────────────────────────────────────────────── */}
          {activeSection === "blog" && (
            <Box>
              <Flex justify="space-between" align="center" mb={6}>
                <Box>
                  <Heading size="lg" color="gray.900">Blog Posts</Heading>
                  <Text color="gray.500" fontSize="sm">{blogPosts.length} posts</Text>
                </Box>
                <Button
                  bg="#ff0036" color="white" size="sm"
                  onClick={() => setShowBlogForm(true)}
                  leftIcon={<FaPlus />}
                  _hover={{ bg: "#d4002d" }}
                >
                  New Post
                </Button>
              </Flex>

              {/* New post form */}
              <AnimatePresence>
                {showBlogForm && (
                  <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    as="form"
                    onSubmit={handleCreatePost}
                    bg="white" rounded="xl" shadow="sm"
                    border="1px solid" borderColor="gray.100"
                    p={6} mb={6}
                  >
                    <Flex justify="space-between" align="center" mb={4}>
                      <Heading size="sm" color="gray.800">Create Blog Post</Heading>
                      <Button size="xs" variant="ghost" onClick={() => setShowBlogForm(false)}><FaTimes /></Button>
                    </Flex>
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Title *</Text>
                        <Input
                          placeholder="Post title"
                          value={newPost.title}
                          onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))}
                          required
                          border="1px solid" borderColor="gray.200" rounded="lg"
                          _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                        />
                      </Box>
                      <Box>
                        <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Excerpt</Text>
                        <Input
                          placeholder="Short description"
                          value={newPost.excerpt}
                          onChange={(e) => setNewPost((p) => ({ ...p, excerpt: e.target.value }))}
                          border="1px solid" borderColor="gray.200" rounded="lg"
                          _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                        />
                      </Box>
                      <Box>
                        <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Category</Text>
                        <select
                          value={newPost.category}
                          onChange={(e) => setNewPost((p) => ({ ...p, category: e.target.value }))}
                          style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "14px" }}
                        >
                          {["Faith & Relationships", "Christian Dating Tips", "Marriage", "Testimonials", "Bible Study", "Community", "Announcements"].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </Box>
                      <Box>
                        <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Content *</Text>
                        <Textarea
                          placeholder="Full blog content..."
                          value={newPost.content}
                          onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))}
                          rows={8}
                          required
                          border="1px solid" borderColor="gray.200" rounded="lg"
                          _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                        />
                      </Box>
                      <Flex align="center" gap={3}>
                        <input
                          type="checkbox"
                          id="published"
                          checked={newPost.published}
                          onChange={(e) => setNewPost((p) => ({ ...p, published: e.target.checked }))}
                        />
                        <label htmlFor="published" style={{ fontSize: "14px", color: "#4a5568" }}>
                          Publish immediately
                        </label>
                      </Flex>
                      <Flex gap={3} justify="flex-end">
                        <Button variant="ghost" onClick={() => setShowBlogForm(false)} size="sm">Cancel</Button>
                        <Button
                          type="submit" bg="#ff0036" color="white" size="sm"
                          loading={postSubmitting}
                          _hover={{ bg: "#d4002d" }}
                        >
                          Create Post
                        </Button>
                      </Flex>
                    </VStack>
                  </MotionBox>
                )}
              </AnimatePresence>

              {/* Post list */}
              <VStack align="stretch" gap={3}>
                {blogPosts.map((post) => (
                  <Box
                    key={post._id}
                    bg="white" rounded="xl" shadow="sm"
                    border="1px solid" borderColor="gray.100"
                    p={5}
                  >
                    <Flex justify="space-between" align="flex-start">
                      <Box flex={1} minW={0} mr={4}>
                        <Heading size="sm" color="gray.900" noOfLines={1} mb={1}>{post.title}</Heading>
                        <Flex gap={2} align="center" flexWrap="wrap">
                          <Badge
                            colorScheme={post.published ? "green" : "orange"}
                            fontSize="10px" rounded="full"
                          >
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <Badge bg="gray.100" color="gray.600" fontSize="10px" rounded="full">{post.category}</Badge>
                          <Text fontSize="xs" color="gray.400">{post.views} views · {post.readTime} min read</Text>
                        </Flex>
                      </Box>
                      <Button
                        size="xs" variant="ghost" color="red.500"
                        onClick={() => handleDeletePost(post._id)}
                        _hover={{ bg: "red.50" }}
                      >
                        <FaTrash />
                      </Button>
                    </Flex>
                  </Box>
                ))}
                {blogPosts.length === 0 && (
                  <Box textAlign="center" py={16} color="gray.400">
                    <Text fontSize="3xl" mb={2}>📝</Text>
                    <Text>No blog posts yet. Create your first post!</Text>
                  </Box>
                )}
              </VStack>
            </Box>
          )}

        </Box>
      </Box>
    </Flex>
  );
}
