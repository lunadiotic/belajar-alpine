function paginationComponent() {
	return {
		members: [], // Ini adalah array anggota yang akan diisi
		perPage: 6,
		currentPage: 1,
		searchQuery: '',
		filteredMembers: [],

		get totalPages() {
			return Math.ceil(this.filteredMembers.length / this.perPage);
		},

		get paginatedMembers() {
			const start = (this.currentPage - 1) * this.perPage;
			const end = this.currentPage * this.perPage;
			return this.filteredMembers.slice(start, end);
		},

		changePage(page) {
			this.currentPage = page;
		},

		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
		},

		nextPage() {
			if (this.currentPage < this.totalPages) {
				this.currentPage++;
			}
		},

		searchMembers() {
			this.filteredMembers = this.members.filter(member => {
				const fullName = member.name.toLowerCase();
				return fullName.includes(this.searchQuery.toLowerCase());
			});
			this.currentPage = 1; // Reset ke halaman pertama setelah pencarian
		},

		async fetchMembers() {
			const response = await fetch('https://randomuser.me/api/?results=30');
			const data = await response.json();
			this.members = data.results.map(member => ({
				name: `${member.name.first} ${member.name.last}`,
				age: member.dob.age,
				gender: member.gender,
				address: `${member.location.street.number} ${member.location.street.name}, ${member.location.city}, ${member.location.state}, ${member.location.country}`,
				photo: member.picture.large,
			}));
			this.filteredMembers = this.members; // Awalnya filteredMembers adalah semua anggota
		},

		init() {
			this.fetchMembers();
		}
	}
}
