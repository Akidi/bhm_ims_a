<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { form, data }: { form: ActionData, data?: PageServerData } = $props();
</script>

<h1>Login/Register</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button>Login</button>
	<button formaction="?/register">Register</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>

<!-- Display a list of all users -->
<table>
	<thead>
		<tr>
			<td>username</td>
		</tr>
	</thead>
	<tbody>
		{#if data}
			{#each data.users as user}
				<tr>
					<td>{user.username}</td>
				</tr>
			{/each}
		{:else}
			<tr>
				<td colspan="3">No users found</td>	
			</tr>
		{/if}
	</tbody>
</table>